from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import ElementNotInteractableException

from driver_options import chrome_options
from price_parser import Price

# Seat Geek specific webscraping
def scrape(team1, team2, section, row, price, quantity):
    tickets_list = []
    url = 'https://seatgeek.com'
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(url)
    print("Finding cheaper tickets for " + team1 + " vs " + team2 + " at " + "Section: " 
    + str(section) + " Row: " + str(row) + " at $" + str(price) + " from " + url + "\n")
    
    try: 
        search_bar = driver.find_element(By.NAME, 'search')
        search_bar.clear()
        search_bar.send_keys(team1 + " vs " + team2)
        # print("Sent to search bar\n", driver.current_url)

        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable(
                (By.XPATH, "//li[@id='active-result-item']/a/article/div/p[contains(text(), 'at')]")
            )
        ).click()
        # print("After clicking\n", driver.current_url)

        driver.add_cookie({"name": "sg-show-fees", "value": "true"})

        driver.refresh()  

        number = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "//*[@id=\"start-of-content\"]/div[1]/div/div[4]/div/h2")
            )
        )

        number = number.text.split(" ")[0]

        last = 5
        actions = ActionChains(driver)
        
        for x in range(5, min(500, int(number))):
            if x - last > 6:
                nextElement = driver.find_element(By.XPATH, f"//*[@id=\"start-of-content\"]/div[1]/div/div[{x+10}]")
                actions.move_to_element(nextElement).perform()
                last = x

            current = driver.find_element(By.XPATH, f"//*[@id=\"start-of-content\"]/div[1]/div/div[{x}]")
            
            (ok, this_row, this_price) = assess(current.text, section, row, price, quantity)
            
            if (ok):
                url = checkout(driver, f"//*[@id=\"start-of-content\"]/div[1]/div/div[{x}]")
                tickets_list.append(("seatgeek", section, this_row, float(this_price) * int(quantity), url))
                print("[FOUND]", "section:", section, "row:", this_row, "price:", float(this_price) * int(quantity))
                WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable(
                        (By.XPATH, "//*[@id=\"start-of-content\"]/div[3]/div/div/div[1]/div/button")
                    )
                ).click()
            
        print(tickets_list)
        return tickets_list
        
            
    except TimeoutException:
        print("Timeout from seatgeek!")
        return tickets_list
    except NoSuchElementException:
        print("No such element exception from seatgeek!")
        return tickets_list
    except StaleElementReferenceException:
        print("State element exception from seatgeek!")
        return tickets_list
    except ElementNotInteractableException:
        print("Element not interactible exception from seatgeek!")
        return tickets_list

def assess(text, section, row, price, quantity):
    (this_section_num, this_row_num, this_price) = parse_seats(text)
    if this_section_num != int(section) or this_row_num > int(row) or this_price * float(quantity)>= float(price):
        return (False, 0, 0)
    return (True, this_row_num, this_price)

def parse_seats(text):
    lines = text.split("\n")
    if not text or len(lines) < 4:
        return (0, 0, 0)
    price = Price.fromstring(lines[0].split(" ")[0]).amount_float
    seat = lines[4].split(" ")
    if len(seat) < 4:
        return (0, 0, 0)
    section = seat[1][:-1]
    row = seat[3]
    if not row.isdigit() or not section.isdigit():
        return (0, 0, 0)
    return (int(section), int(row), price)

def checkout(driver, element):
    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, element)
        )
    ).click()
    # print("Done loading page", driver.current_url)

    t = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(
            (By.XPATH, "//*[@id=\"start-of-content\"]/div[3]/div/div/div[2]/div/div[4]/a")
        )
    )

    return t.get_attribute('href')



