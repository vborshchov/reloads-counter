import React from "react";
import { Link } from "route-lite";
import About from "./About";
import TableStats from "./TableStats";
import Launch from "@material-ui/icons/Launch";
import Tooltip from "@material-ui/core/Tooltip";
import "Styles/header.scss";

const openInSeparatePage = () => {
  chrome.tabs.create({ url: "popup.html" });
}

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
      <Tooltip title="Open in new tab" aria-label="Open in new tab">
        <Launch className="right-items__link" onClick={openInSeparatePage} />
      </Tooltip>
    </div>
  </header>
);

export default Header;
