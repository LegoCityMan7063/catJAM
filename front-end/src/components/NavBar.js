import React, { useState, useEffect } from 'react';
import "./NavBar.css";
import "../styles.css";
import { Link } from 'react-router-dom';
import logo from "../Logo";
import { Add, Chat, Dashboard, ExitToApp, LibraryMusic, MusicNote } from '@material-ui/icons';
import NavBarOption from "./NavBarOption";
import { Divider, Menu } from '@material-ui/core';
import { bool, func } from 'prop-types';
import { StyledNav } from "./NavBar.styled";
import { useDataLayerValue } from "../dataLayer";
import { useLocation } from "react-router-dom";

{/* Burger Menu: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */}

function NavBar({ open, setOpen }) {
    const [{ user }, dispatch] = useDataLayerValue();
    const [username, setName] = useState("");
    const location = useLocation();
    useEffect(() => {
        let username = document.cookie.match(new RegExp('(^| )' + 'username' + '=([^;]+)'));
        if (username !== null) {
            dispatch({
                type: 'SET_USER',
                user: username[2] 
            });
            setName(username[2]);
        }
    }, [location, dispatch]);

    if (location.pathname === "/" ||
        location.pathname === "/aboutus" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/404") {
      return null;
    }

    const signout = async() => {
        var fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: null,
        };
        return fetch("/logout", fetchOptions)
        .then((res) => {
            if (res.status !== 200 ){
              console.log({errorMessage: res.status + " " + res.statusText});
            }
            return res;
        });
    };
    
    return (
        <StyledNav open={open} className="nav-bar">
            <img
            src={logo}
            alt="logo"
            className="navbar-icon"
            />
            <h2 className="main-theme-no-background">catJAM</h2>
            <Link to="/dashboard" className="navbar-link">
                <NavBarOption Icon={Dashboard} title="Dashboard" />
            </Link>
            <Link to="/rooms" className="navbar-link">
                <NavBarOption Icon={Chat} title="Karaoke Rooms" />
            </Link>
            <Link to="/songs" className="navbar-link">
                <NavBarOption Icon={MusicNote} title="Songs" />
            </Link>
            <Link to="/playlists" className="navbar-link">
                <NavBarOption Icon={LibraryMusic} title="Your Playlists" />
            </Link>
            <Link to="/addsong" className="navbar-link">
                <NavBarOption Icon={Add} title="Add Song" />
            </Link>
            <div className="profile">
                <NavBarOption title={username}/>
            </div>
            <Link to="/" className="sign-out" onClick={signout}>
                <NavBarOption Icon={ExitToApp} title="Sign Out" />
            </Link>
        </StyledNav>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired
};

export default NavBar