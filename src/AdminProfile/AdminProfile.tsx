import React, {useState, useEffect} from 'react';
import LoggedInNavbar from '../Navbar/LoggedIn'
import Redirection from '../Functions/Redirection';
import AdminSideBar from './AdminSideBar';
import '../Styles/Profile/AdminProfile.css';
import AdminPersonal from './AdminPersonal';
import AdminSearch from './AdminSearch';
import AdminApprove from './AdminApprove';
import AdminScrap from './AdminScrap';


function AdminProfile() {
    const [response, setResponse] = useState({flag:0});

    useEffect(()=>{
        Redirection.then((res)=>setResponse(res)).catch((err)=>console.log(err));
    },[]) 
  

    if(response.flag === 1)
        return<>
            <div id="AdminProfile">
                <LoggedInNavbar/>
                <AdminSideBar/>
                <div id="AdminWindows">
                    <h4 id="AdminProfileHeading">Admin Panel</h4>
                    <AdminPersonal data={response}/>
                    <AdminSearch data={response}/>
                    <AdminApprove/>
                    <AdminScrap/>
                </div>
            </div>
    </>
    else
        return <><div></div></>
}

export default AdminProfile;