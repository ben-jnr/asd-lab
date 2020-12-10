import React, {useState, useEffect} from 'react';
import LoggedInNavbar from '../Navbar/LoggedIn'
import Redirection from '../Functions/Redirection';
import IndustrySideBar from './IndustrySideBar';
import '../Styles/Profile/IndustryProfile.css';
import IndustryPersonal from './IndustryPersonal';
import IndustrySearch from './IndustrySearch';



function IndustryProfile() {
    const [response, setResponse] = useState({flag:0});

    useEffect(()=>{
        Redirection.then((res)=>setResponse(res)).catch((err)=>console.log(err));
    },[]) 
  

    if(response.flag === 1)
        return<>
            <div id="IndustryProfile">
                <LoggedInNavbar/>
                <IndustrySideBar/>
                <div id="IndustryWindows">
                    <h4 id="IndustryProfileHeading">Dashboard</h4>
                    <IndustryPersonal data={response}/>
                    <IndustrySearch data={response}/>
                </div>
            </div>
    </>
    else
        return <><div></div></>
}

export default IndustryProfile