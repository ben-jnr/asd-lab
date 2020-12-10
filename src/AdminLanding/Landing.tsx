import React, { useState, useEffect } from 'react';
import '../Styles/Landing/Landing.css';
import AdminLoggedOutNavbar from '../Navbar/AdminLoggedOut';
import Redirection from '../Functions/Redirection';
import LandingText from '../Landing/LandingText';
import AdminLogin from './AdminLogin';



function Landing() {
  const [response,setResponse] = useState({flag:0});
  
  useEffect(()=>{
    Redirection.then((res)=>setResponse(res)).catch((err)=>console.log(err));
  },[]) 
  

  if(response.flag === 1)
    return <>
      <div id="Landing">
        <AdminLoggedOutNavbar />
        <LandingText/>
        <AdminLogin/>
      </div>
    </>
  else
    return<><div></div></>
}

export default Landing;
