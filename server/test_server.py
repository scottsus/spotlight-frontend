from flask import Flask, request
import flask
import json
from threading import Thread
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/find-sports-tickets", methods=["GET"])
def find_sports_tickets():
    return json.dumps([
        {
            "name": "seatgeek",
            "section": 100,
            "row": 20,
            "price": 400,
            "url": "https://scott-susanto.herokuapp.com"
        },
        {
            "name": "stubhub",
            "section": 100,
            "row": 20,
            "price": 400,
            "url": "https://scott-susanto.herokuapp.com"
        },
        {
            "name": "tickpick",
            "section": 100,
            "row": 20,
            "price": 400,
            "url": "https://scott-susanto.herokuapp.com"
        },
        {
            "name": "ticketmaster",
            "section": 100,
            "row": 20,
            "price": 400,
            "url": "https://scott-susanto.herokuapp.com"
        },
    ])


if __name__ == "__main__":
    app.run("localhost", 6969)