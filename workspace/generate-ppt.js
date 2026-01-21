const pptxgen = require('pptxgenjs');
const path = require('path');

// Get html2pptx from the skills directory
const html2pptx = require(path.resolve('.agent/skills/4-tools/pptx-creating/scripts/html2pptx.js'));

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Antigravity';
    pptx.title = '指标减负思路设计';
    pptx.subject = '企业管理优化方案';

    const slides = [
        'slide01-cover.html',
        'slide02-problem1.html',
        'slide03-problem2.html',
        'slide04-solution.html',
        'slide05-implementation1.html',
        'slide06-implementation2.html',
        'slide07-measure1.html',
        'slide08-measure2.html',
        'slide09-measure3.html',
        'slide10-measure4.html',
        'slide11-summary.html',
        'slide12-ending.html'
    ];

    console.log('Starting PPTX generation...');

    for (const slideFile of slides) {
        const slidePath = path.resolve('workspace/slides', slideFile);
        console.log(`Processing: ${slideFile}`);
        try {
            await html2pptx(slidePath, pptx);
        } catch (err) {
            console.error(`Error in ${slideFile}:`, err.message);
            throw err;
        }
    }

    const outputPath = path.resolve('workspace/指标减负思路设计.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved to: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Failed:', err);
    process.exit(1);
});
