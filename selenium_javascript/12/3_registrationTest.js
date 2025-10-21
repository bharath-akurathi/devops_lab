const { Builder, By, until } = require('selenium-webdriver');

(async function registrationFormTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:8000');
    await driver.findElement(By.id('fullname')).sendKeys('John Doe');
    await driver.findElement(By.id('email')).sendKeys('john@example.com');
    await driver.findElement(By.id('phno')).sendKeys('9876543210');
    await driver.findElement(By.css('input[value="Male"]')).click();
    await driver.findElement(By.id('event')).sendKeys('Workshop');
    await driver.findElement(By.id('address')).sendKeys('123 Test Street');
    await driver.findElement(By.css('input[type="submit"]')).click();

    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const msg = await alert.getText();
    console.log('Alert message:', msg);
    await alert.accept();

    if (msg.includes('Successful')) console.log('✅ Test Passed');
    else console.log('❌ Unexpected message');
  } 
  catch (err) {
    console.error('❌ Error:', err);
  } 
  finally {
    await driver.quit();
  }
})();