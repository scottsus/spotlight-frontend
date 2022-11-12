from flask import Flask, request, jsonify
import flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return flask.jsonify({"greeting": "hello BITCH"})

@app.route("/find-cheaper-tickets", methods=["GET","POST"])
def send_cheaper_tickets():
    print("received from client!")
    fullname = "Found cheaper tickets for " + request.headers['name'] + " from " + request.headers['website'] + "!!!\n"
    fullname += "Check them out here!"
    print(fullname)
    return jsonify({"message": fullname})

if __name__ == "__main__":
    app.run("localhost", 6969)