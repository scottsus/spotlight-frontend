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
def scrape(team1, team2, src_section, src_row, src_total_price, quantity):
    url = 'https://stubhub.com'
    print("Finding " + str(quantity) + " tickets for " + team1 + " vs " + team2 + " at " + "Section: " 
    + str(src_section) + " Row: " + str(src_row) + " at $" + str(src_total_price) + " from " + url + "\n")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)

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
            EC.element_to_be_clickable(
                (By.XPATH, "//*[name()='g']/*[name()='text'][contains(text(), '" + str(src_section) + "')]")
            )
        ).click()
        # print("Filtered to particular section", driver.current_url)

        driver.get(driver.current_url + "&estimatedFees=true")
        # print("Set estimated fees to true", driver.current_url)

        idx = 0
        tickets_list = []
        while True:
            WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located(
                    (By.XPATH, "//div[div[contains(text(), 'Section') and span[contains(text(), 'Row')]]]")
                )
            )
            choices = driver.find_elements(By.XPATH,
                "//div[div/div/div[contains(text(), 'Section') and span[contains(text(), 'Row')]]]"
            )
            try:
                choice = choices[idx]
                (ok, dest_row, dest_price) = assess(choice.text, src_section, src_row, src_total_price, quantity)
                if (ok):
                    choice.click()
                    url = driver.current_url
                    print("[FOUND]", "section:", src_section, "row:", dest_row, "price:", float(dest_price) * int(quantity))
                    tickets_list.append(("stubhub", src_section, dest_row, float(dest_price) * int(quantity), url))
                    WebDriverWait(driver, 10).until(
                        EC.presence_of_element_located(
                            (By.XPATH, "//button/div/div[contains(text(), 'Back to tickets')]")
                        )
                    ).click()
            except IndexError:
                break
            idx += 1

        return tickets_list
    
    except TimeoutException:
        print("Timeout!")
        return tickets_list
    except NoSuchElementException:
        print("No such element exception")
        return tickets_list
    except StaleElementReferenceException:
        print("State element exception")
        return tickets_list
    except ElementNotInteractableException:
        print("Element not interactible exception")
        return tickets_list

    
def assess(text, src_section, src_row, src_total_price, quantity):
    (dest_section, dest_row, dest_price) = parse_seats(text)
    if dest_section != int(src_section) or dest_row > int(src_row) or dest_price * float(quantity) >= float(src_total_price):
        return (False, 0, 0)
    return (True, dest_row, dest_price)

def parse_seats(text):
    digits = [int(s) for s in text.split() if s.isdigit()]
    this_price = Price.fromstring(text.split('$')[1]).amount_float
    return (digits[0], digits[1], this_price)

# tickets_list = scrape('Boston Celtics', 'Los Angeles Lakers', 318, 10, 600, 2)
# print(tickets_list)