import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Expose a function to collect spline app keys
  await page.exposeFunction('logKeys', (keys) => {
    console.log('SplineApp Properties/Methods:', keys);
  });

  page.on('console', msg => {
    if (msg.text().includes('SPLINE_KEYS:')) {
      console.log(msg.text().substring(12));
    }
  });

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 8000));
  await browser.close();
})();
