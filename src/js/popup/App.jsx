import React from "react";
import Header from "./Header";
import { hot } from "react-hot-loader";
import "Styles/app.scss";
import Router from "route-lite";
import TableStats from "./TableStats";

chrome.storage.local.get(["reloadStats"], function(result) {
    if (result.reloadStats) {
        console.table(result.reloadStats);
    }
});

class App extends React.Component {
  render () {
    return (
        <div className="app">
            <Header name="Page reloads statistics" />
            <Router>
                <TableStats />
            </Router>
        </div>
    );
  }
};

export default hot(module)(App);
