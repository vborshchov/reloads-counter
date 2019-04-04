import React from "react";
import { Link } from "route-lite";
import About from "./About";
import TableStats from "./TableStats";
import Launch from "@material-ui/icons/Launch";
import "Styles/header.scss";

const Header = () => (
  <header className="app-header">
    <nav className="navigation">
      <Link className="navigation__item" component={TableStats}>
        Table
      </Link>
      <Link className="navigation__item" href="/chart.html">
        Charts
      </Link>
      <Link className="navigation__item" component={About}>
        About
      </Link>
    </nav>
    <div className="right-items">
      <Launch className="right-items__link" />
    </div>
  </header>
);

export default Header;
