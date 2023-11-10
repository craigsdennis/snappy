require("dotenv").config();
const { chromium } = require("playwright");

// This accounts for all additional requests (supposedly)
function requestsAreFinished(page) {
  return new Promise((resolve, reject) => {
    page.on("requestfinished", (data) => {
      return page.waitForTimeout(parseInt(process.env.TIMEOUT))
        .then(() => resolve(data));
    });

  })
}

async function snappy(url) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  await requestsAreFinished(page);
  const html = await page.content();
  browser.close();
  return html;
}

module.exports = { snappy }