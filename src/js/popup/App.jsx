import React from "react";
import Header from "./components/Header";
import { hot } from "react-hot-loader";
import "Styles/app.scss";
import Router from "route-lite";
import TableStats from "./components/TableStats";

const App = () => {
  return (
    <div className="app">
      <Header name="Page reloads statistics" />
      <Router>
        <TableStats />
      </Router>
    </div>
  );
};

export default hot(module)(App);
