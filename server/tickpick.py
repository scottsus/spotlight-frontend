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

# Tickpick specific webscraping
def scrape(team1, team2, section, row, price, quantity):
    tickets_list = []
    url = 'https://www.tickpick.com/'
    print("Finding cheaper tickets for " + team1 + " vs " + team2 + " at " + "Section: " 
    + str(section) + " Row: " + str(row) + " at $" + str(price) + " from " + url + "\n")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)

    try:
        search_bar = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.ID, 'searchText')
            )
        )

        search_bar.clear()
        search_bar.send_keys(team1 + " vs " + team2 + Keys.RETURN)
        print("Sent to search bar", driver.current_url)


        a_tag = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.XPATH, "//*[@id=\"localEvents\"]/div[1]/a")
            )
        )
        driver.get(a_tag.get_attribute('href'))
        print("clicked a tag\n", driver.current_url);

        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located(
                (By.XPATH, "//*[@id=\"listingContainer\"]/div[1]")
            )
        )
        print('here', driver.current_url)

        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located(
                (By.CLASS_NAME, "listing")
            )
        )
        print("listing\n", driver.current_url);

        choices = driver.find_elements(By.CLASS_NAME,
            "listing"
        )
        for choice in choices:
            print(choice.text)
        ind = 0

        for choice in choices:
            # choice = choices[ind]
            (ok, this_row, this_price) = assess(choice.text, section, row, price, quantity)
            if (ok):
                url = driver.current_url
                # driver.back()
                tickets_list.append(("tickpick", section, this_row, float(this_price) * int(quantity), url))
                print("[FOUND]", "section:", section, "row:", this_row, "price:", float(this_price) * int(quantity))

        # print(tickets_list)
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
    

    
def assess(text, section, row, price, quantity):
    (this_section_num, this_row_num, this_price) = parse_seats(text)
    if this_section_num != int(section) or this_row_num > int(row) or this_price * float(quantity) >= float(price):
        return (False, 0, 0)
    return (True, this_row_num, this_price)

def parse_seats(text):
    prices = text.split("\n")
    this_price = Price.fromstring(prices[0].split(" ")[0]).amount_float
    for x in prices:
        if x[0:7] == "Section":
            seat = x.split(" ")
            if not seat[1].isdigit() or not seat[4].isdigit():
                break
            return (int(seat[1]), int(seat[4]), this_price)
    return (0, 0, this_price)

# scrape('Boston Celtics', 'Los Angeles Lakers', 318, 10, 2, 250)