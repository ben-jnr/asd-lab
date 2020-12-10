import React from 'react';
import '../Styles/Navbar/LoggedIn.css';
import '../Styles/Navbar/Navbar.css';
import Logo from '../Images/logo.png';
import logout from '../Functions/Logout';


function LoggedIn() {
    return<>
        <nav id="Navbar">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo"><img alt='logo' id="Logo" src={Logo}></img></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <a className="waves-effect waves-light btn NavbarLogoutBtn"  onClick ={()=>logout().then(()=>{}).catch((err)=>console.log(err))}>Logout</a>
                </ul>
            </div>
        </nav>
    </>
} 

export default LoggedIn;