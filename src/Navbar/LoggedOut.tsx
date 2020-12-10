import React from 'react';
import '../Styles/Navbar/LoggedOut.css';
import '../Styles/Navbar/Navbar.css';
import Logo from '../Images/logo.png';
import $ from 'jquery';


const closeRegModal = () => {
    $('#RegModal').removeClass("show");
    $('.modal-backdrop').css('display','none');
}

const closeLoginModal = () => {
    $('#LoginModal').removeClass("show");
    $('.modal-backdrop').css('display','none');
}


function LoggedOut() {
    return<>
        <nav id="Navbar">
            <div className="nav-wrapper">
            <a href="/" className="brand-logo"><img alt='logo' id="Logo" src={Logo}></img></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <a id="NavbarRegBtn" className="waves-effect waves-light btn" data-toggle="modal" data-target="#RegModal" onClick = {closeLoginModal}>Register</a>
                <a id="NavbarLoginBtn" className="waves-effect waves-light btn" data-toggle="modal" data-target="#LoginModal" onClick = {closeRegModal}>Login</a>
            </ul>
            </div>
        </nav>
    </>;
}


export default LoggedOut;