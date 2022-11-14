from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from driver_options import chrome_options
from price_parser import Price

# Seat Geek specific Webscraping
def scrape(team1, team2):
    url = 'https://seatgeek.com'
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)
    print("Finding cheaper tickets for " + team1 + " vs " + team2 + " from " + url)

    search_bar = driver.find_element(By.NAME, 'search')
    search_bar.clear()
    search_bar.send_keys(team1 + " vs " + team2)
    # print("Sent to search bar", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//li[@id='active-result-item']/a/article/div/p[contains(text(), 'at')]")
        )
    ).click()
    # print("After clicking", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//div[div/div/h3[contains(text(), 'each')]]")
        )
    ).click()
    # print("Done loading page", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//div/div/a[span[contains(text(), 'checkout')]]")
        )
    ).click()
    #print("Going to checkout", driver.current_url)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//div/div/p[contains(text(), 'Section')]")
        )
    )
    section_span = driver.find_element(By.XPATH, "//div/div/p[contains(text(), 'Section')]")
    seats = section_span.text

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//div/div/p[contains(text(), 'each')]")
        )
    )
    priceSpan = driver.find_element(By.XPATH, "//div/div/p[contains(text(), 'each')]")
    price = extract_price(priceSpan.text)

    print(seats)
    print(price)
    return ("seatgeek", seats, price, driver.current_url)
    driver.close()

def extract_price(pricestr):
    price = Price.fromstring(pricestr)
    return price.amount_text
