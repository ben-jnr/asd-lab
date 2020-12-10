import React from 'react';
import '../Styles/SideBar/AdminSideBar.css';
import profileImg from '../Images/profile.svg';
import searchImg from '../Images/search.svg';
import approvedImg from '../Images/approved.svg';
import scrapImg from '../Images/scrap.svg';
import $ from 'jquery';


const changeActive = (id:string, windowID:string) => {
    $(".activeBar").removeClass('activeBar');
    $("#" + id).addClass('activeBar');
    $(".activeWindow").removeClass('activeWindow');
    $("#" + windowID).addClass('activeWindow');
}

function AdminSideBar() {
    return<>
        <div id="AdminSideBar">
            <div id="AdminProfileImgDiv" className="SideBarDiv activeBar" onClick = {() => changeActive("AdminProfileImgDiv", "AdminPersonal")}>
                <img id="AdminProfileImg" src={profileImg}></img>
            </div>
            <div id="AdminSearchImgDiv" className="SideBarDiv" onClick = {() => changeActive("AdminSearchImgDiv","AdminSearch")}>
                <img id="AdminSearchImg" src={searchImg}></img>
            </div>
            <div id="AdminApprovedImgDiv" className="SideBarDiv" onClick = {() => changeActive("AdminApprovedImgDiv","AdminApprove")}>
                <img id="AdminApprovedImg" src={approvedImg}></img>
            </div>
            <div id="AdminScrapImgDiv" className="SideBarDiv" onClick = {() => changeActive("AdminScrapImgDiv","AdminScrap")}>
                <img id="AdminScrapImg" src={scrapImg}></img>
            </div>
        </div>
    </>
}

export default AdminSideBar;