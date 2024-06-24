import puppeteer from 'puppeteer';

const defaultOptions = {
  format: 'A4',
  printBackground: true,
};

export async function htmlTopdf(html, options = defaultOptions) {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['headless', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.emulateMediaType('screen');
  await page.setContent(html, { waitUntil: 'networkidle2' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });
  // await browser.close();
  return pdfBuffer;
}

