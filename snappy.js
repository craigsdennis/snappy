const { chromium } = require("playwright");

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function snappy(url) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  function printHtmlAndExit() {
    page.content().then((html) => {
      console.log(html);
      browser.close();
    });
  }
  // When all requests have finished finishing. This is dorky.
  page.on("requestfinished", debounce(printHtmlAndExit));
}

const url = process.argv[2];
if (url === undefined) {
  console.error(`Usage: node snappy.js <URL>`);
  process.exit(1);
}
snappy(url)
  .catch(err => console.error(err));
