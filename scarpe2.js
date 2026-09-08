const puppeteer = require('puppeteer');

async function getMagnumDirectAPI() {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // 1. Listen for network responses from Magnum's API
    page.on('response', async (response) => {
      const url = response.url();
      
      // Target the internal draw results endpoint
      if (url.includes('/api/') || url.includes('draw') || url.includes('results')) {
        if (response.request().resourceType() === 'fetch' || response.request().resourceType() === 'xhr') {
          try {
            const data = await response.json();
            console.log('\n🎯 Found API Data Stream:', url);
            console.log(JSON.stringify(data, null, 2));
          } catch (e) {
            // Ignore non-JSON responses
          }
        }
      }
    });

    // 2. Navigate to the results page
    console.log('Navigating to results page...');
    await page.goto('https://www.magnum4d.my/results/draw-results', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Keep browser open briefly to catch the response stream
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (browser) await browser.close();
  }
}

getMagnumDirectAPI();