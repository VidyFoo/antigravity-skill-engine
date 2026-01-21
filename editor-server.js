const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('workspace'));

const slidesDir = path.join(__dirname, 'workspace/slides');

// 获取幻灯片列表
app.get('/api/slides', (req, res) => {
    const files = fs.readdirSync(slidesDir)
        .filter(f => f.endsWith('.html'))
        .sort();
    res.json(files);
});

// 读取幻灯片内容
app.get('/api/slide/:name', (req, res) => {
    const filePath = path.join(slidesDir, req.params.name);
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content });
});

// 保存幻灯片内容
app.post('/api/slide/:name', (req, res) => {
    const filePath = path.join(slidesDir, req.params.name);
    fs.writeFileSync(filePath, req.body.content, 'utf8');
    res.json({ success: true });
});

// 生成 PPTX
app.post('/api/generate', (req, res) => {
    console.log('Generating PPTX...');
    exec('node workspace/generate-ppt-v2.js', { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
        res.json({ success: true, log: stdout });
    });
});

app.listen(port, () => {
    console.log(`PPT Editor Server running at http://localhost:${port}`);
});
