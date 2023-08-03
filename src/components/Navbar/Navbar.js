import React from "react";
import "./Navbar.scss";
import logo from "../../logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="Navbar" data-testid="navbar">
            <figure className="Navbar__Logo">
                <img src={logo} alt="logo" />
            </figure>
            <ul className="Navbar__List">
                <li aria-label="product-link">
                    <NavLink to="/">Products</NavLink>
                </li>
                <li aria-label="create-product-link">
                    <NavLink to="/create">Create a new product</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
