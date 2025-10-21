const { Builder, By, Key, until } = require('selenium-webdriver');

(async function googleSearchTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.google.com');
    // handle consent popup if visible (EU users) - best-effort
    try {
      let accept = await driver.findElements(By.css('button[aria-label="Accept all"]'));
      if (accept.length) await accept[0].click();
    } catch (e) {}

    const q = await driver.findElement(By.name('q'));
    await q.sendKeys('DevOps', Key.RETURN);

    await driver.wait(until.titleContains('DevOps'), 7000);
    console.log('Page title:', await driver.getTitle());
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await driver.quit();
  }
})();
