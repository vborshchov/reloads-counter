import React from 'react';
import { Link, goBack } from "route-lite";
import About from "./About";
import "Styles/header.scss";

const Header = ({ name }) => (
    <header>
        <h1>{name}</h1>
        <nav className="navigation">
            <Link onClick={goBack}>Home</Link>
            <Link component={About}>About</Link>
        </nav>
    </header>
);

export default Header;