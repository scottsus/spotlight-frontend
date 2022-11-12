import React from "react";
import ReactDOM from "react-dom";

const greeting = <h1>Hello Spotlight!</h1>;

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(greeting, root);
