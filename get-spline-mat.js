import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(msg.text());
  });

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 6000));
  await page.evaluate(() => {
     if (window.splineApp) {
        const obj = window.splineApp.findObjectByName('Ellipse');
        if (obj) {
            console.log('Ellipse keys:', Object.keys(obj));
            if (obj.material) console.log('Material keys:', Object.keys(obj.material));
            if (obj.materials) console.log('Materials array len:', obj.materials.length, 'keys:', Object.keys(obj.materials[0] || {}));
            if (obj.color) console.log('Color:', obj.color);
        }
        
        const mesh = window.splineApp.findObjectByName('Ellipse Mesh');
        if (mesh) {
            console.log('Ellipse Mesh keys:', Object.keys(mesh));
            if (mesh.material) console.log('Mesh Material keys:', Object.keys(mesh.material));
            if (mesh.materials) console.log('Mesh Materials array len:', mesh.materials.length, 'keys:', Object.keys(mesh.materials[0] || {}));
            
            // let's look deep into first material
            if (mesh.materials && mesh.materials.length > 0) {
                 const mat = mesh.materials[0];
                 console.log('Mat type:', mat.type, 'name:', mat.name);
                 console.log('Mat color:', mat.color);
                 if (mat.colorRenderable) console.log('Mat colorRenderable:', Object.keys(mat.colorRenderable));
                 
                 // How to change color?
            }
        }
        
        const bg = window.splineApp.findObjectByName('BG Mesh');
        if (bg) {
             console.log('BG Mesh materials:', bg.materials ? bg.materials.length : 'none');
             if (bg.materials) console.log('BG Color:', bg.materials[0].color);
        }
     }
  });
  await browser.close();
})();
