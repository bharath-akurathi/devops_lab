from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Open browser
driver = webdriver.Chrome()

try:
    driver.get("http://localhost:8000")

    # Test 1: Check title
    print("Page Title:", driver.title)

    # Test 2: Fill form fields
    driver.find_element(By.ID, "fullname").send_keys("John Doe")
    driver.find_element(By.ID, "email").send_keys("john@example.com")
    driver.find_element(By.ID, "phno").send_keys("9876543210")
    driver.find_element(By.CSS_SELECTOR, "input[value='Male']").click()
    driver.find_element(By.ID, "event").send_keys("Workshop")

    # Submit the form
    driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()
    time.sleep(1)

    # Handle alert
    alert = driver.switch_to.alert
    print("Alert Message:", alert.text)
    print("✅ Test Passed")
    alert.accept()

except Exception as e:
    print("❌ Error:", e)

finally:
    driver.quit()