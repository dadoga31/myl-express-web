import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
     setInterval(() => {
        if (window.splineApp) {
           const obj = window.splineApp.findObjectByName('Heading');
           if (obj) {
              console.log('Heading pos:', obj.position, 'scale:', obj.scale, 'visible:', obj.visible);
           }
        }
     }, 2000);
  });
  await new Promise(r => setTimeout(r, 6000));
  await browser.close();
})();
