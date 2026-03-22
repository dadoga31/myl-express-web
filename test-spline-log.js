import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.text().includes('Spline Node:')) {
      console.log(msg.text().substring(13));
    }
  });

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 6000));
  await browser.close();
})();
