const puppeteer = require('puppeteer');

const url = "https://www.mercadolivre.com.br";
const search = "Macbook";

let c = 1;

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log('INICIEI');


    await page.goto(url);
    console.log('Fui para a URL');

    await page.waitForSelector('#cb1-edit');
    
    await page.type('#cb1-edit', search);

    await Promise.all([
        page.waitForNavigation(),
        page.click('.nav-icon-search')
    ])


    const links = await page.$$eval('.ui-search-result__image', el => el.map(link => link.href));

    for (const link of links) {
        console.log('Pagina', c);
        await page.goto(link);
        await page.waitForSelector('.ui-pdp-title');

        const title = await page.$eval('.ui-pdp-title', element => element.textContent)
        const price = await page.$eval('andes-money-amount__fraction' , element => element.textContent)

        const obj = {title ,price};
        console.log(obj)    


       c++;
       await delay(3000);

    }
        await browser.close();
})();
