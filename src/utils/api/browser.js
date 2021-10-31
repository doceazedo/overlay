import puppeteer from 'puppeteer';

let page = null;

const newBrowser = async () => {
  console.log('⚠ Novo navegador aberto!');

  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  return page;
}

const browser = async () => page || await newBrowser();

export default browser;