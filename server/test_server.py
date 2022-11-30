from flask import Flask, request
from flask_cors import CORS
import json
import time
import random

app = Flask(__name__)
CORS(app)

@app.route("/scrape/seatgeek", methods=["GET"])
def scrape_seatgeek():
    timeWait = random.randint(3, 10)
    time.sleep(timeWait)
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    dest_price_low = 0 if int(float(src_price)) - 300 < 0 else 300
    dest_price1 = random.randint(dest_price_low, int(float(src_price)))
    dest_price2 = random.randint(dest_price_low, int(float(src_price)))
    if dest_price1 % 2 == 1:
        dest_price1 += 1
    if dest_price2 % 2 == 1:
        dest_price2 += 1
    dest_row1 = random.randint(1, int(src_row))
    dest_row2 = random.randint(1, int(src_row))
    return json.dumps([
        {
            "name": "seatgeek",
            "section": src_section,
            "row": dest_row1,
            "totalPrice": dest_price1,
            "quantity": quantity,
            "url": "https://seatgeek.com"
        },
        {
            "name": "seatgeek",
            "section": src_section,
            "row": dest_row2,
            "totalPrice": dest_price2,
            "quantity": quantity,
            "url": "https://seatgeek.com/2"
        }
    ])

@app.route("/scrape/stubhub", methods=["GET"])
def scrape_stubhub():
    timeWait = random.randint(3, 10)
    time.sleep(timeWait)
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    dest_price_low = 0 if int(float(src_price)) - 300 < 0 else 300
    dest_price1 = random.randint(dest_price_low, int(float(src_price)))
    dest_price2 = random.randint(dest_price_low, int(float(src_price)))
    if dest_price1 % 2 == 1:
        dest_price1 += 1
    if dest_price2 % 2 == 1:
        dest_price2 += 1
    dest_row1 = random.randint(1, int(src_row))
    dest_row2 = random.randint(1, int(src_row))
    return json.dumps([
        {
            "name": "stubhub",
            "section": src_section,
            "row": dest_row1,
            "totalPrice": dest_price1,
            "quantity": quantity,
            "url": "https://stubhub.com"
        },
        {
            "name": "stubhub",
            "section": src_section,
            "row": dest_row2,
            "totalPrice": dest_price2,
            "quantity": quantity,
            "url": "https://stubhub.com/2"
        },
    ])

@app.route("/scrape/tickpick", methods=["GET"])
def scrape_tickpick():
    timeWait = random.randint(3, 10)
    time.sleep(timeWait)
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    dest_price_low = 0 if int(float(src_price)) - 300 < 0 else 300
    dest_price1 = random.randint(dest_price_low, int(float(src_price)))
    dest_price2 = random.randint(dest_price_low, int(float(src_price)))
    if dest_price1 % 2 == 1:
        dest_price1 += 1
    if dest_price2 % 2 == 1:
        dest_price2 += 1
    dest_row1 = random.randint(1, int(src_row))
    dest_row2 = random.randint(1, int(src_row))
    return json.dumps([
        {
            "name": "tickpick",
            "section": src_section,
            "row": dest_row1,
            "totalPrice": dest_price1,
            "quantity": quantity,
            "url": "https://tickpick.com"
        },
        {
            "name": "tickpick",
            "section": src_section,
            "row": dest_row2,
            "totalPrice": dest_price2,
            "quantity": quantity,
            "url": "https://tickpick.com/2"
        }
    ])

@app.route("/scrape/ticketmaster", methods=["GET"])
def scrape_ticketmaster():
    timeWait = random.randint(3, 10)
    time.sleep(timeWait)
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    dest_price_low = 0 if int(float(src_price)) - 300 < 0 else 300
    dest_price1 = random.randint(dest_price_low, int(float(src_price)))
    dest_price2 = random.randint(dest_price_low, int(float(src_price)))
    if dest_price1 % 2 == 1:
        dest_price1 += 1
    if dest_price2 % 2 == 1:
        dest_price2 += 1
    dest_row1 = random.randint(1, int(src_row))
    dest_row2 = random.randint(1, int(src_row))
    
    return json.dumps([
        {
            "name": "ticketmaster",
            "section": src_section,
            "row": dest_row1,
            "totalPrice": dest_price1,
            "quantity": quantity,
            "url": "https://ticketmaster.com"
        },
        {
            "name": "ticketmaster",
            "section": src_section,
            "row": dest_row2,
            "totalPrice": dest_price2,
            "quantity": quantity,
            "url": "https://ticketmaster.com/2"
        }
    ])


def get_data_from_req(request):
    team1 = request.headers['team1']
    team2 = request.headers['team2']
    section = request.headers['section']
    row = request.headers['row']
    total_price = request.headers['totalPrice']
    quantity = request.headers['quantity']
    return (team1, team2, section, row, total_price, quantity)

if __name__ == "__main__":
    app.run("localhost", 6969)