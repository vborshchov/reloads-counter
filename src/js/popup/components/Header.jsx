import React from "react";
import { Link } from "route-lite";
import About from "./About";
import TableStats from "./TableStats";
import "Styles/header.scss";

const Header = () => (
  <header>
    <nav className="navigation">
      <Link className="navigation__item" component={TableStats}>
        Home
      </Link>
      <Link className="navigation__item" component={About}>
        About
      </Link>
    </nav>
  </header>
);

export default Header;
