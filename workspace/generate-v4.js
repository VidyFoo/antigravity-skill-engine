const pptxgen = require('pptxgenjs');
const html2pptx = require('../.agent/skills/4-tools/pptx-creating/scripts/html2pptx.js');
const fs = require('fs');
const path = require('path');

async function run() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';

    const slidesDir = path.join(__dirname, 'slides');
    const files = fs.readdirSync(slidesDir)
        .filter(f => f.slice(0, 5) === 'slide' && f.endsWith('.html'))
        .sort();

    console.log(`TOTAL FILES: ${files.length}`);

    for (const file of files) {
        process.stdout.write(`Adding ${file}... `);
        try {
            await html2pptx(path.join(slidesDir, file), pptx);
            process.stdout.write(`[OK]\n`);
        } catch (err) {
            process.stdout.write(`[FAIL: ${err.message}]\n`);
        }
    }

    const out = path.join(__dirname, 'metric-reduction-v4.pptx');
    await pptx.writeFile({ fileName: out });
    console.log(`Saved v4 to ${out}`);
}
run();
