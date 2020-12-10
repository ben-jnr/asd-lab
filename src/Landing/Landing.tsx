import React, { useState, useEffect } from 'react';
import '../Styles/Landing/Landing.css';
import LoggedOutNavbar from '../Navbar/LoggedOut';
import Redirection from '../Functions/Redirection';
import LandingText from './LandingText';
import Register from './Register';
import Login from './Login';



function Landing() {
  const [response,setResponse] = useState({flag:0});
  
  useEffect(()=>{
    Redirection.then((res)=>setResponse(res)).catch((err)=>console.log(err));
  },[]) 
  

  if(response.flag === 1)
    return <> 
      <div id="Landing">
        <LoggedOutNavbar />
        <LandingText/>
        <Register/>
        <Login/>
      </div>
    </>
  else 
    return<><div></div></>
}

export default Landing;
