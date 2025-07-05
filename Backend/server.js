const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body; 

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Disable cache and set consistent conditions
    await page.setCacheEnabled(false);
    await page.setExtraHTTPHeaders({
      'Accept-Encoding': 'gzip'
    });

    // Record detailed resources
    const resources = [];
    page.on('response', async (response) => {
      const contentLength = response.headers()['content-length'];
      const size = contentLength ? parseInt(contentLength) : 0;
      
      resources.push({
        type: response.request().resourceType(),
        size: size
      });
    });

    const startTime = Date.now();
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    // Wait longer for potential lazy-loaded content
    await new Promise(res => setTimeout(res, 3000));
    
    const loadTime = Date.now() - startTime;

    // Calculate totals
    const pageSize = resources.reduce((total, r) => total + r.size, 0);
    const requestCount = resources.length;

    // Calculate breakdown by type
    const breakdown = {};
    resources.forEach(res => {
      if (!breakdown[res.type]) {
        breakdown[res.type] = { size: 0, count: 0 };
      }
      breakdown[res.type].size += res.size;
      breakdown[res.type].count++;
    });

    await browser.close();

    res.json({
      loadTime,
      pageSize,
      requestCount,
      breakdown
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});