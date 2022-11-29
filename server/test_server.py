from flask import Flask, request
from flask_cors import CORS
import json
import time

app = Flask(__name__)
CORS(app)

@app.route("/scrape/seatgeek", methods=["GET"])
def scrape_seatgeek():
    return json.dumps([
        {
            "name": "seatgeek",
            "section": 100,
            "row": 20,
            "price": 1000,
            "url": "https://seatgeek.com"
        },
        {
            "name": "seatgeek",
            "section": 200,
            "row": 15,
            "price": 800,
            "url": "https://seatgeek.com/2"
        }
    ])

@app.route("/scrape/stubhub", methods=["GET"])
def scrape_stubhub():
    return json.dumps([
        {
            "name": "stubhub",
            "section": 100,
            "row": 20,
            "price": 400,
            "url": "https://stubhub.com"
        },
        {
            "name": "stubhub",
            "section": 100,
            "row": 20,
            "price": 950,
            "url": "https://stubhub.com/2"
        },
    ])

@app.route("/scrape/tickpick", methods=["GET"])
def scrape_tickpick():
    time.sleep(7)
    return json.dumps([
        {
            "name": "tickpick",
            "section": 100,
            "row": 20,
            "price": 900,
            "url": "https://tickpick.com"
        },
        {
            "name": "tickpick",
            "section": 100,
            "row": 20,
            "price": 100,
            "url": "https://tickpick.com/2"
        }
    ])

@app.route("/scrape/ticketmaster", methods=["GET"])
def scrape_ticketmaster():
    time.sleep(6)
    return json.dumps([
        {
            "name": "ticketmaster",
            "section": 100,
            "row": 20,
            "price": 400,
            "url": "https://ticketmaster.com"
        },
        {
            "name": "ticketmaster",
            "section": 100,
            "row": 20,
            "price": 4000,
            "url": "https://ticketmaster.com/2"
        }
    ])


if __name__ == "__main__":
    app.run("localhost", 6969)