from flask import Flask, request, jsonify
import flask
import json
from flask_cors import CORS
import seat_geek

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
    (name, seats, price, url) = seat_geek.find_cheaper_tickets(team1, team2)
    return jsonify({
        "name": name,
        "seats": seats,
        "price": price,
        "url": url
    })

if __name__ == "__main__":
    app.run("localhost", 6969)