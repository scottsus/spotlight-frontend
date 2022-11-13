from flask import Flask, request
import flask
import json
from flask_cors import CORS

import seat_geek
# import stubhub
# import ticketmaster
# import tickpick

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return flask.jsonify({"greeting": "hello BITCH"})

@app.route("/find-tickets", methods=["GET"])
def send_tickets():
    team1 = request.headers['team1']
    team2 = request.headers['team2']
    msg = "Found cheaper tickets for " + team1 + " vs " + team2 + "\n"
    
    response_list = [] # TODO: Make multithreading
    response_list.append(seat_geek.find_cheaper_tickets(team1, team2))
    response_list.append(seat_geek.find_cheaper_tickets(team1, team2))
    response_list.append(seat_geek.find_cheaper_tickets(team1, team2))
    response_list.append(seat_geek.find_cheaper_tickets(team1, team2))
    
    dicts = list(map(tuple_to_dict, response_list))
    return json.dumps(dicts)

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