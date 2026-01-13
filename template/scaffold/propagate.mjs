#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const OWNER = "VidyFoo";
const TOPIC = "from-template-antigravity";
const TEMPLATE_REPO = "VidyFoo/TEMPLATE_ANTIGRAVITY";
const TEMPLATE_BRANCH = "main";
const CONCURRENCY = Number(process.env.PROPAGATE_CONCURRENCY || 3);

const PAT = process.env.TEMPLATE_SYNC_PAT || "";

if (!PAT) {
  console.error(
    "缺少 TEMPLATE_SYNC_PAT。请在模板仓库 Secrets 中设置一个具有 repo scope 的 PAT。"
  );
  process.exit(1);
}

function run(cmd, options = {}) {
  return execSync(cmd, { stdio: "inherit", ...options });
}

function runQuiet(cmd, options = {}) {
  return execSync(cmd, { encoding: "utf8", ...options }).trim();
}

function ghApi(pathname) {
  const cmd = `gh api ${pathname}`;
  return JSON.parse(runQuiet(cmd, { env: { ...process.env, GH_TOKEN: PAT } }));
}

function listRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const response = ghApi(`/search/repositories?q=topic:${TOPIC}+user:${OWNER}&per_page=100&page=${page}`);
    repos.push(...response.items.map((item) => item.full_name));
    if (response.items.length < 100) break;
    page += 1;
  }
  return repos;
}

async function runWithConcurrency(items, concurrency, worker) {
  let index = 0;
  const results = [];

  async function next() {
    const itemIndex = index++;
    if (itemIndex >= items.length) {
      return;
    }
    const item = items[itemIndex];
    try {
      const result = await worker(item);
      results.push(result);
    } catch (error) {
      results.push({ repo: item, error });
    }
    await next();
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => next()
  );
  await Promise.all(workers);
  return results;
}

async function syncRepo(repoFullName) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "template-sync-"));
  const repoDir = path.join(tmpDir, repoFullName.replace("/", "-"));
  const authRepoUrl = `https://${PAT}@github.com/${repoFullName}.git`;

  run(`git clone ${authRepoUrl} ${repoDir}`);
  run(`git -C ${repoDir} remote add upstream https://github.com/${TEMPLATE_REPO}.git`);
  run(`git -C ${repoDir} fetch upstream`);

  let mergeSuccess = true;
  try {
    run(`git -C ${repoDir} checkout ${TEMPLATE_BRANCH}`);
    run(`git -C ${repoDir} merge upstream/${TEMPLATE_BRANCH}`);
  } catch {
    mergeSuccess = false;
  }

  if (mergeSuccess) {
    run(`git -C ${repoDir} push origin ${TEMPLATE_BRANCH}`);
    return { repo: repoFullName, status: "pushed" };
  }

  const branchName = `sync-template-${Date.now()}`;
  run(`git -C ${repoDir} checkout -b ${branchName}`);
  run(`git -C ${repoDir} merge upstream/${TEMPLATE_BRANCH} || true`);
  run(`git -C ${repoDir} add -A`);
  run(`git -C ${repoDir} commit -m "chore: sync template" || true`);
  run(`git -C ${repoDir} push origin ${branchName}`);

  const prCmd = `gh pr create --repo ${repoFullName} --title "Sync template" --body "Automated template sync failed due to conflicts." --base ${TEMPLATE_BRANCH} --head ${branchName}`;
  run(prCmd, { env: { ...process.env, GH_TOKEN: PAT } });

  return { repo: repoFullName, status: "pr" };
}

async function main() {
  const repos = listRepos();
  if (repos.length === 0) {
    console.log("未找到任何下游仓库。");
    return;
  }
  console.log(`检测到 ${repos.length} 个下游仓库。`);
  await runWithConcurrency(repos, CONCURRENCY, syncRepo);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
