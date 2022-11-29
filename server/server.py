from flask import Flask, request
import flask
import json
from threading import Thread
from flask_cors import CORS

import seatgeek
import stubhub
import ticketmaster
import tickpick

app = Flask(__name__)
CORS(app)

@app.route("/scrape/stubhub")
def scrape_stubhub():
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    tickets_list = stubhub.scrape(team1, team2, src_section, src_row, src_price, quantity)
    print(tickets_list)
    response_list = []
    for ticket in tickets_list:
        res = tuple_to_dict(ticket)
        response_list.append(res)
    return json.dumps(response_list)

@app.route("/scrape/ticketmaster")
def scrape_ticketmaster():
    # TODO
    return []

@app.route("/scrape/seatgeek")
def scrape_seatgeek():
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    tickets_list = seatgeek.scrape(team1, team2, src_section, src_row, src_price, quantity)
    print(tickets_list)
    response_list = []
    for ticket in tickets_list:
        res = tuple_to_dict(ticket)
        response_list.append(res)
    return json.dumps(response_list)

@app.route("/scrape/tickpick")
def scrape_tickpick():
    (team1, team2, src_section, src_row, src_price, quantity) = get_data_from_req(request)
    tickets_list = tickpick.scrape(team1, team2, src_section, src_row, src_price, quantity)
    print(tickets_list)
    response_list = []
    for ticket in tickets_list:
        res = tuple_to_dict(ticket)
        response_list.append(res)
    return json.dumps(response_list)

def get_data_from_req(request):
    team1 = request.headers['team1']
    team2 = request.headers['team2']
    section = request.headers['section']
    row = request.headers['row']
    total_price = request.headers['price']
    quantity = request.headers['quantity']
    return (team1, team2, section, row, total_price, quantity)

def tuple_to_dict(ticket):
    with app.app_context():
        res = {
            "name": ticket[0][0],
            "section": ticket[0][1],
            "row": ticket[0][2],
            "price": ticket[0][3],
            "url": ticket[0][4],
        }
        return res

if __name__ == "__main__":
    app.run("localhost", 6969)