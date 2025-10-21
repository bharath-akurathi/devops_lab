const { Builder } = require('selenium-webdriver');

(async function () {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://example.com');
    console.log('Title:', await driver.getTitle());
  } finally {
    await driver.quit();
  }
})();