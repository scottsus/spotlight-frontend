from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from driver import driver

# Seat Geek specific Webscraping
def find_cheaper_tickets(team1, team2):
    url = 'https://seatgeek.com'
    driver.get(url)
    print("Finding cheaper tickets for " + team1 + " vs " + team2 + " from " + url)

    search_bar = driver.find_element(By.NAME, 'search')
    search_bar.clear()
    search_bar.send_keys(team1 + " vs " + team2)
    # print("Sent to search bar", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//li[@id='active-result-item']/a/article/div/p[contains(text(), 'at')]"))).click()
    # print("After clicking", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//div[div/div/h3[contains(text(), 'each')]]"))).click()
    # print("Done loading page", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//div/div/a[span[contains(text(), 'checkout')]]"))).click()
    #print("Going to checkout", driver.current_url)

    print("[Checkout Page]:", driver.current_url)
    return driver.current_url
    driver.close()

find_cheaper_tickets('Los Angeles Clippers', 'Houston Rockets')