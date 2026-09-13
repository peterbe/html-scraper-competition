import puppeteer from 'puppeteer';

/* See other great tips on:
https://hackernoon.com/tips-and-tricks-for-web-scraping-with-puppeteer-ed391a63d952
*/

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: html_getter [options] <url>');
  console.log('Options:');
  process.exit(0);
}

if (args.length < 1) {
  throw new Error('URL argument is required');
}
const url = args[0];

(async (url) => {
  if (!url) throw new Error('URL is required');

  const browser = await puppeteer.launch({
    // headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  page.setDefaultTimeout(10 * 1000);
  try {
    const response = await page.goto(url, {
      timeout: 100 * 1000,
      waitUntil: 'load',
    });

    // let exit = 0;
    if (response?.ok()) {
      const html = await page.content();
      process.stdout.write(html);
    } else if (!response) {
      throw new Error(`Response was null for ${url}`);
    } else {
      throw new Error(`Response was ${response.status()} for ${url}`);
    }
  } finally {
    await browser.close();
  }
})(url);
