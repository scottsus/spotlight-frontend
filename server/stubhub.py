from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from driver_options import chrome_options
from price_parser import Price

# Stubhub specific webscraping
def scrape(team1, team2):
    url = 'https://stubhub.com'
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)
    print("Finding cheaper tickets for " + team1 + " vs " + team2 + " from " + url)

    search_bar = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//label/div/div/div/input")
        )
    )
    search_bar.clear()
    search_bar.send_keys(team1 + " vs " + team2 + Keys.RETURN)
    # print("Sent to search bar", driver.current_url)

    a_tag = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//a[div/div/div/div/div/div/div[contains(text(), 'See Tickets')]]")
        )
    )
    driver.get(a_tag.get_attribute('href'))
    # print("Team1 at Team 2: See Tickets", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//div/div/button[contains(text(), '1')]")
        )
    ).click()
    # print("Chose 1 ticket", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//div[div[contains(text(), 'Section') and span[contains(text(), 'Row')]]]")
        )
    ).click()
    # print("Section: X", driver.current_url)

    you_pay_div = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//div[span[contains(text(), 'each')]]")
        )
    ) # because there are multiple $ in the page but only 1 'each'
    price_span = you_pay_div.find_element(By.XPATH, ".//span[contains(text(), '$')]")
    price = Price.fromstring(price_span.text).amount_text
    
    row_div = driver.find_element(By.XPATH, "//div/div[contains(text(), 'Row')]")
    row = row_div.text
    url = driver.current_url
    print(url)

    print(row)
    print(price)
    driver.close()
    return ('stubhub', row, price, url)
    