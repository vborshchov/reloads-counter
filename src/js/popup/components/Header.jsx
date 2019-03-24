import React from "react";
import { Link } from "route-lite";
import About from "./About";
import TableStats from "./TableStats";
import "Styles/header.scss";

const Header = () => (
  <header>
    <nav className="navigation">
      <ul>
        <li>
          <Link component={TableStats}>Home</Link>
        </li>
        <li>
          <Link component={About}>About</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
