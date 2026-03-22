import puppeteer from 'puppeteer';
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 8000));
    await page.screenshot({ path: 'spline_vivid_test.png' });
    await browser.close();
    console.log("Screenshot successful");
  } catch (e) {
    console.error(e);
  }
})();
