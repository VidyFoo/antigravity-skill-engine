const pptxgen = require('pptxgenjs');
const html2pptx = require('../.agent/skills/4-tools/pptx-creating/scripts/html2pptx.js');
const path = require('path');

async function test() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    const slides = [
        'slide09-implementation-dynamic.html',
        'slide10-categories-rights.html',
        'slide11-coe-evolution-system.html',
        'slide12-measure-ai.html',
        'slide13-summary-gold.html'
    ];
    for (const s of slides) {
        console.log(`Testing ${s}...`);
        try {
            await html2pptx(path.join(__dirname, 'slides', s), pptx);
            console.log(`Done ${s}`);
        } catch (e) {
            console.error(`Fail ${s}: ${e.message}`);
        }
    }
    await pptx.writeFile({ fileName: path.join(__dirname, 'test-last.pptx') });
}
test();
