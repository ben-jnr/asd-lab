import React from 'react';
import '../Styles/Navbar/LoggedOut.css';
import '../Styles/Navbar/Navbar.css';
import Logo from '../Images/logo.png';


function LoggedOut() {
    return<>
        <nav id="Navbar">
            <div className="nav-wrapper">
            <a href="/" className="brand-logo"><img alt='logo' id="Logo" src={Logo}></img></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <a id="AdminNavbarLoginBtn" className="waves-effect waves-light btn" data-toggle="modal" data-target="#AdminLoginModal">Admin Login</a>
            </ul>
            </div>
        </nav>
    </>;
}


export default LoggedOut;