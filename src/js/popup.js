/*global chrome*/

import "Styles/popup.css";
import App from "./popup/App.jsx";
import React from "react";
import { render } from "react-dom";

render(
  <App />,
  window.document.getElementById("app-container")
);