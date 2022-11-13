from flask import Flask, request
import flask
import json
from threading import Thread
from flask_cors import CORS

import seatgeek
# import stubhub
# import ticketmaster
# import tickpick

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return flask.jsonify({"greeting": "hello BITCH"})

@app.route("/find-sports-tickets", methods=["GET"])
def find_sports_tickets():
    team1 = request.headers['team1']
    team2 = request.headers['team2']
    msg = "Found cheaper tickets for " + team1 + " vs " + team2 + "\n"
    
    response_list = [None] * 4
    
    t1 = Thread(target=find_cheaper_tickets, args=[response_list, 0, seatgeek.scrape, team1, team2])
    t2 = Thread(target=find_cheaper_tickets, args=[response_list, 1, seatgeek.scrape, team1, team2])
    t3 = Thread(target=find_cheaper_tickets, args=[response_list, 2, seatgeek.scrape, team1, team2])
    t4 = Thread(target=find_cheaper_tickets, args=[response_list, 3, seatgeek.scrape, team1, team2])

    t1.start()
    t2.start()
    t3.start()
    t4.start()

    t1.join()
    t2.join()
    t3.join()
    t4.join()
    
    dicts = list(map(tuple_to_dict, response_list))
    return json.dumps(dicts)

def find_cheaper_tickets(response_list, index, scrape, team1, team2):
    response = scrape(team1, team2)
    response_list[index] = response

def tuple_to_dict(res):
    with app.app_context():
        dict = {
            "name": res[0],
            "seats": res[1],
            "price": res[2],
            "url": res[3],
        }
        return dict

if __name__ == "__main__":
    app.run("localhost", 6969)