const pptxgen = require('pptxgenjs');
const html2pptx = require('../.agent/skills/4-tools/pptx-creating/scripts/html2pptx.js');
const fs = require('fs');
const path = require('path');

async function run() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';

    const slidesDir = path.join(__dirname, 'slides');
    const files = fs.readdirSync(slidesDir)
        .filter(f => f.endsWith('.html'))
        .sort(); // Ensure order slide01, slide02...

    console.log(`🚀 Starting PPTX generation for ${files.length} slides...`);

    for (const file of files) {
        const filePath = path.join(slidesDir, file);
        console.log(`  - Processing: ${file}`);

        try {
            // Use html2pptx to add slide
            await html2pptx(filePath, pptx);
        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err.message);
        }
    }

    const outputPath = path.join(__dirname, 'metric-reduction-v3.pptx');
    await pptx.writeFile({ fileName: outputPath });

    console.log(`✅ Success! Presentation saved to: ${outputPath}`);
}

run().catch(console.error);
