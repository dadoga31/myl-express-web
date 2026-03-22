import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 12000));
  await page.screenshot({ path: 'spline_long_test.png' });
  await browser.close();
})();
