import React from "react";
import icon from "../../img/icon128.png"
import Header from "./Header.jsx";
import { hot } from "react-hot-loader";

chrome.storage.local.get(["reloadStats"], function(result) {
    if (result.reloadStats) {
        console.table(result.reloadStats);
    }
});

class App extends React.Component {
  render () {
    return (
      <div>
        <Header name="Page reloads statistics!" />
        <p>Hello, find me on src/js/popup/greeting_component.jsx</p>
        <img src={icon} />
      </div>
    )
  }
};

export default hot(module)(App);
