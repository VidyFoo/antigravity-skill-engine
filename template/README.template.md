# TEMPLATE_ANTIGRAVITY 模板说明

本仓库为私有模板仓库，核心代码来自 `core/`（通过 subtree 同步）。

## 组装机制
新建仓库后，首次 push 到 `main` 会触发 `first-boot-assemble`，自动执行：
1. 将 `core/` 内容复制到仓库根目录；
2. 叠加 `overlay/` 内容；
3. 进行 `scaffold/config.json` 中的变量替换；
4. 生成 `.assembled` 标记；
5. 将模板管理目录移动到 `.template/`。

## 彻底移除模板管理文件
如不需要保留模板管理资产，可在确认 `.template/` 内容无用后删除：
```
rm -rf .template
```
