const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        const startTime = Date.now();
        const response = await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        if (!response.ok()) {
            await browser.close();
            return res.status(400).json({ error: `Failed to load page (HTTP ${response.status()})` });
        }

        const endTime = Date.now();
        const loadTime = endTime - startTime;

        const metrics = await page.metrics();
        const performanceData = await page.evaluate(() => 
            JSON.parse(JSON.stringify(window.performance.getEntries()))
        );

        let pageSize = 0;
        let requests = 0;

        performanceData.forEach(entry => {
            if (entry.transferSize) {
                pageSize += entry.transferSize;
                requests++;
            }
        });

        await browser.close();

        res.json({
            loadTime,
            pageSize: pageSize,
            requestCount: requests
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Analysis failed', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});