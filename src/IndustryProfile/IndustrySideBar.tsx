import React from 'react';
import '../Styles/SideBar/IndustrySideBar.css';
import profileImg from '../Images/profile.svg';
import searchImg from '../Images/search.svg';
import $ from 'jquery';


const changeActive = (id:string, windowID:string) => {
    $(".activeBar").removeClass('activeBar');
    $("#" + id).addClass('activeBar');
    $(".activeWindow").removeClass('activeWindow');
    $("#" + windowID).addClass('activeWindow');
}

function IndustrySideBar() {
    return<>
        <div id="IndustrySideBar">
            <div id="IndustryProfileImgDiv" className="SideBarDiv activeBar" onClick = {() => changeActive("IndustryProfileImgDiv", "IndustryPersonal")}>
                <img id="IndustryProfileImg" src={profileImg}></img>
            </div>
            <div id="IndustrySearchImgDiv" className="SideBarDiv" onClick = {() => changeActive("IndustrySearchImgDiv","IndustrySearch")}>
                <img id="IndustrySearchImg" src={searchImg}></img>
            </div>
        </div>
    </>
}

export default IndustrySideBar;