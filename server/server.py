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

@app.route("/")
def hello():
    return flask.jsonify({"greeting": "hello BITCH"})

@app.route("/find-sports-tickets", methods=["GET"])
def find_sports_tickets():
    team1 = request.headers['team1']
    team2 = request.headers['team2']
    section = request.headers['section']
    row = request.headers['row']
    price = request.headers['price']
    quantity = request.headers['quantity']
    
    response_list = [None] * 4
    
    t1 = Thread(target=find_cheaper_tickets, args=[response_list, 0, stubhub.scrape, team1, team2, section, row, price, quantity])
    t2 = Thread(target=find_cheaper_tickets, args=[response_list, 1, stubhub.scrape, team1, team2, section, row, price, quantity])
    t3 = Thread(target=find_cheaper_tickets, args=[response_list, 2, stubhub.scrape, team1, team2, section, row, price, quantity])
    t4 = Thread(target=find_cheaper_tickets, args=[response_list, 3, stubhub.scrape, team1, team2, section, row, price, quantity])

    t1.start()
    t2.start()
    t3.start()
    t4.start()

    t1.join()
    t2.join()
    t3.join()
    t4.join()
    
    dicts = list(map(tuple_to_dict, response_list))
    final_response = [res for res in dicts if res is not None]
    return json.dumps(final_response)

def find_cheaper_tickets(response_list, index, scrape, team1, team2, section, row, price, quantity):
    response = scrape(team1, team2, section, row, price, quantity)
    if response[0] != "":
        response_list[index] = response

def tuple_to_dict(res):
    with app.app_context():
        if res == None:
            return None
        dict = {
            "name": res[0],
            "section": res[1],
            "row": res[2],
            "price": res[3],
            "url": res[4],
        }
        return dict

if __name__ == "__main__":
    app.run("localhost", 6969)