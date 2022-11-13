from flask import Flask, request, jsonify
import flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return flask.jsonify({"greeting": "hello BITCH"})

@app.route("/find-tickets", methods=["GET"])
def send_tickets():
    msg = "Finding tickets for " + request.headers['team1'] + " vs " + request.headers['team2'] + "\n"
    
    return jsonify({
        "message": msg
    })

if __name__ == "__main__":
    app.run("localhost", 6969)