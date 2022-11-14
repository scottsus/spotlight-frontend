from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from driver_options import chrome_options

from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import ElementNotInteractableException

from price_parser import Price
import time

# Stubhub specific webscraping
def scrape(team1, team2, section, row, price):
    url = 'https://stubhub.com'
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)
    print("Finding cheaper tickets for " + team1 + " vs " + team2 + " at " + "Section: " 
        + str(section) + " Row: " + str(row) + " at $" + str(price) + " from " + url + "\n")

    try:
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
            EC.presence_of_element_located(
                (By.XPATH, "//div[div[contains(text(), 'Section') and span[contains(text(), 'Row')]]]")
            )
        )

        time.sleep(2)
        choices = driver.find_elements(By.XPATH,
            "//div[div/div[contains(text(), 'Section') and span[contains(text(), 'Row')]]]"
        )

        for choice in choices:
            (ok, this_row, this_price) = assess(choice.text, section, row, price)
            if (ok):
                choice.click()
                url = driver.current_url
                driver.close()
                print("[FOUND]", "row:", section, this_row, "price:", this_price)
                return ("stubhub", section, this_row, this_price, url)  

        (this_section, this_row, this_price) = parse_seats(choices[0].text)
        choices[0].click()
        url = driver.current_url
        driver.close()
        print("[NOT FOUND]", "row:", this_section, this_row, "price:", this_price)
        return ("stubhub", this_section, this_row, this_price, url)
    
    except TimeoutException:
        print("Timeout!")
        return ("", 0, 0, 0, 0)
    except NoSuchElementException:
        print("No such element exception")
        return ("", 0, 0, 0, 0)
    except StaleElementReferenceException:
        print("State element exception")
        return ("", 0, 0, 0, 0)
    except ElementNotInteractableException:
        print("Element not interactible exception")
        return ("", 0, 0, 0, 0)
    

    
def assess(text, section, row, price):
    (this_section_num, this_row_num, this_price) = parse_seats(text)
    if this_section_num != int(section) or this_row_num > int(row) or this_price >= float(price):
        return (False, 0, 0)
    return (True, this_row_num, this_price)

def parse_seats(text):
    digits = [int(s) for s in text.split() if s.isdigit()]
    this_price = Price.fromstring(text.split('$')[1]).amount_float
    return (digits[0], digits[1], this_price)
