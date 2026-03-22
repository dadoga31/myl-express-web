import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(msg.text());
  });

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 6000));
  await page.screenshot({ path: 'spline_hidden_test.png' });
  await browser.close();
  console.log('done screenshot');
})();
