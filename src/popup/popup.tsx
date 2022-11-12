import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";

const greeting = <h1>Hello Spotlight!</h1>;

const image = <img src="spotlight.png" />;

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(image, root);
