import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import edit from '../Images/edit.svg';
import del from '../Images/delete.svg';
import approved from '../Images/approved2.svg';


function IndustryPersonal(data:any) {

    
    const [available, setAvailable] = useState([{name:"", type:"", hazard:"",qty:"",rate:""}]);
    const [scrap,setScrap] = useState([{name:""}]);




    useEffect(function() {
        $('.IndustryAvailableSave').hide();

        async function getWaste() {
            const response = await axios.get('/industry/scrap');
            if(typeof response.data === 'object'){
                setScrap(response.data);
            }
            else {
                console.log(response.data)
            }
        }
        getWaste().then(()=>{}).catch((err)=>console.log(err));

        async function getAvailable() {
            const response = await axios.get('/industry/available');
            if(typeof response.data === 'object'){
                setAvailable(response.data);
            }
            else {
                console.log(response.data)
            }
        }
        getAvailable().then(()=>{}).catch((err)=>console.log(err));
    },[])





    useEffect(()=>{
        $('.IndustryAvailableSave').hide();
        for(let i=0;i<available.length;i++) {
            $("#IndustryAvailableName"+available[i].name.replace(/ /g, "")).val(available[i].name);
            $("#IndustryAvailableType"+available[i].name.replace(/ /g, "")).val(available[i].type);
            $("#IndustryAvailableHazard"+available[i].name.replace(/ /g, "")).val(available[i].hazard);
            $("#IndustryAvailableQty"+available[i].name.replace(/ /g, "")).val(available[i].qty);
            $("#IndustryAvailableRate"+available[i].name.replace(/ /g, "")).val(available[i].rate);
        }
    },[available])





    async function addAvailable() {
        if($("#IndustryAvailableAddSelect").val() !== "" && $("#IndustryAvailableAddSelect").val() !== "choose a waste" && $("#IndustryAvailableAddQty").val() !== "" && $("#IndustryAvailableAddRate").val() !== "" ) {
            const data = {name:$("#IndustryAvailableAddSelect").val(), qty:$("#IndustryAvailableAddQty").val(), rate:$("#IndustryAvailableAddRate").val()};
            const response = await axios.post('/industry/available/add',data);
            if(typeof response.data === 'object') {
                setAvailable(response.data);
            }
            else {
                console.log(response.data);
            }
        }
        else {
            console.log("Add available form incomplete");
        }
        $('#IndustryAvailableAddQty').val("");
        $('#IndustryAvailableAddRate').val("");
    }





    async function removeAvailable(record:any) {
        const data = {name:record.name};
        const response= await axios.post('/industry/available/delete',data);
        if(typeof response.data === 'object') {
            setAvailable(response.data);
        }
        else {
            console.log(response.data);
        }
    }





    async function editAvailable(record:any) {
        $("#IndustryAvailableQty"+record.name.replace(/ /g, "")).removeAttr("disabled");
        $("#IndustryAvailableRate"+record.name.replace(/ /g, "")).removeAttr("disabled");
        $("#IndustryAvailableQty"+record.name.replace(/ /g, "")).parent().css("background-color","rgba(0,0,0,0.05)");
        $("#IndustryAvailableRate"+record.name.replace(/ /g, "")).parent().css("background-color","rgba(0,0,0,0.05)");
        $("#IndustryAvailableEdit"+record.name.replace(/ /g, "")).hide();
        $("#IndustryAvailableSave"+record.name.replace(/ /g, "")).show();
    }
        





    async function saveAvailable(record:any) {
        if($("#IndustryAvailableQty" + record.name.replace(/ /g, "")).val() !== "" && $("#IndustryAvailableRate" + record.name.replace(/ /g, "")).val() !== "") {
        $("#IndustryAvailableSave"+record.name.replace(/ /g, "")).hide();
            const data = {name: record.name, qty:$("#IndustryAvailableQty" + record.name.replace(/ /g, "")).val(),
                rate:$("#IndustryAvailableRate" + record.name.replace(/ /g, "")).val()};
            const response = await axios.post('/industry/available/update',data);
            if(typeof response.data === 'object') {
                setAvailable(response.data);
            }
            else {
                console.log(response.data);
            }
        }
        else {
            console.log("fill in all the columns")
        }
        $("#IndustryAvailableQty"+record.name.replace(/ /g, "")).attr("disabled","disabled");
        $("#IndustryAvailableRate"+record.name.replace(/ /g, "")).attr("disabled","disabled");
        $("#IndustryAvailableQty"+record.name.replace(/ /g, "")).parent().css("background-color","rgba(0,0,0,0)");
        $("#IndustryAvailableRate"+record.name.replace(/ /g, "")).parent().css("background-color","rgba(0,0,0,0)");
        $("#IndustryAvailableSave"+record.name.replace(/ /g, "")).hide();
        $("#IndustryAvailableEdit"+record.name.replace(/ /g, "")).show();
    }





    if(available.length === 0) {
        $("#IndustryPersonalAvailableTable").hide();
        $("#IndustryPersonalAvailableTableEmpty").show();
    }
    else {
        $("#IndustryPersonalAvailableTableEmpty").hide();
        $("#IndustryPersonalAvailableTable").show();
    }



    const generateOptions=()=> {
        let optionsBody:any = [];
        scrap.map((rec)=> {
            optionsBody.push(<option value={rec.name}>{rec.name}</option>);
        })
        return(
            <select id="IndustryAvailableAddSelect" className="browser-default IndustryAvailableAddInput">
                <option defaultValue="choose a waste">Choose a waste</option>
                {optionsBody}
            </select>
        );
    }




    return<>
        <div id="IndustryPersonal" className='activeWindow'>
            <div id="IndustryPersonalAbout">
                <div className='IndustryProfileSubHeading'><strong>About</strong></div>
                <table id="IndustryPersonalAboutTable">
                    <tbody>
                        <tr> 
                            <td className="IndustryPersonalAboutTableLeft"><strong>ID</strong></td>  
                            <td><strong>:</strong></td>  
                            <td className="IndustryPersonalAboutTableRight"><strong>{data.data.id}</strong></td> </tr>
                        <tr> 
                            <td className="IndustryPersonalAboutTableLeft"><strong>Username</strong></td>
                            <td><strong>:</strong></td>  
                            <td className="IndustryPersonalAboutTableRight"><strong>@{data.data.username}</strong></td> 
                        </tr>
                        <tr> 
                            <td className="IndustryPersonalAboutTableLeft"><strong>Name</strong></td>  
                            <td><strong>:</strong></td>  
                            <td className="IndustryPersonalAboutTableRight"><strong>{data.data.name}</strong></td> 
                        </tr>
                        <tr> 
                            <td className="IndustryPersonalAboutTableLeft"><strong>Location</strong></td>  
                            <td><strong>:</strong></td>  
                            <td className="IndustryPersonalAboutTableRight"><strong>{data.data.location}</strong></td> 
                        </tr>
                        <tr> 
                            <td className="IndustryPersonalAboutTableLeft"><strong>Contact</strong></td>  
                            <td><strong>:</strong></td>  
                            <td className="IndustryPersonalAboutTableRight"><strong>{data.data.contact}</strong></td> 
                        </tr>
                    </tbody>    
                </table>

                <div className='IndustryProfileSubHeading AddAvailableSubHeading'><strong>Add Availability</strong></div>
                <table id="IndustryAvailableAddTable">
                    <tbody>
                        <tr>
                            <td>
                                {generateOptions()}
                            </td>
                        </tr>
                        <tr>
                            <td className = "IndustryAvailableAddTd">
                                <div className="input-field col s6">
                                    <input placeholder="Quantity*" id="IndustryAvailableAddQty" className="IndustryAvailableAddInput" type="text"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className = "IndustryAvailableAddTd">
                                <div className="input-field col s6 ">
                                    <input placeholder="Rate*" id="IndustryAvailableAddRate" className="IndustryAvailableAddInput" type="text"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className = "IndustryAvailableAddTd">
                                <a id="IndustryAvailableAddBtn" className="waves-effect waves-light btn" onClick={addAvailable}>Go</a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>    
                </table>

            </div>


            <div id="IndustryPersonalAvailable">
                <div className='IndustryProfileSubHeading'><strong>Available Scrap</strong></div>
                <table id="IndustryPersonalAvailableTable">
                    <thead>
                        <tr>
                            <td className = "IndustryAvailableTableHeadTd">Name</td>
                            <td className = "IndustryAvailableTableHeadTd">Type</td>
                            <td className = "IndustryAvailableTableHeadTd">Hazard</td>
                            <td className = "IndustryAvailableTableHeadTd">Quantity</td>
                            <td className = "IndustryAvailableTableHeadTd">Rate</td>
                            <td className = "IndustryAvailableTableHeadTdBtn">Edit</td>
                            <td className = "IndustryAvailableTableHeadTdBtn">Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                    {available.map((record)=>(
                        <tr key={record.name}>
                            <td className = "IndustryAvailableTableTd">
                                <div>
                                    <input disabled className="IndustryAvailableTableInput" id={"IndustryAvailableName" + record.name.replace(/ /g, "")} type="text"/>
                                </div>
                            </td>
                            <td className = "IndustryAvailableTableTd">
                                <div>
                                    <input disabled className="IndustryAvailableTableInput" id={"IndustryAvailableType" + record.name.replace(/ /g, "")} type="text"/>
                                </div>
                            </td>
                            <td className = "IndustryAvailableTableTd">
                                <div>
                                    <input disabled className="IndustryAvailableTableInput" id={"IndustryAvailableHazard" + record.name.replace(/ /g, "")} type="text"/>
                                </div>
                            </td>
                            <td className = "IndustryAvailableTableTd">
                                <div>
                                    <input disabled className="IndustryAvailableTableInput" id={"IndustryAvailableQty" + record.name.replace(/ /g, "")} type="text"/>
                                </div>
                            </td>
                            <td className = "IndustryAvailableTableTd">
                                <div>
                                    <input disabled className="IndustryAvailableTableInput" id={"IndustryAvailableRate" + record.name.replace(/ /g, "")} type="text"/>
                                </div>
                            </td>
                            <td className = "IndustryAvailableTableTdBtn">
                                <a className="IndustryAvailableBtn IndustryAvailableEdit waves-effect waves-light btn IndustryAvailableTableInput" id={"IndustryAvailableEdit" + record.name.replace(/ /g, "")} onClick={()=>editAvailable(record)}>
                                    <img src={edit}/>
                                </a>
                                <a className="IndustryAvailableBtn IndustryAvailableSave waves-effect waves-light btn IndustryAvailableTableInput" id={"IndustryAvailableSave" + record.name.replace(/ /g, "")} onClick={()=>saveAvailable(record)}>
                                    <img src={approved}/>
                                </a>
                            </td>
                            <td className = "IndustryAvailableTableTdBtn">
                                <a className="IndustryAvailableBtn IndustryAvailableDel waves-effect waves-light btn IndustryAvailableTableInput" id={"IndustryAvailableDel" + record.name.replace(/ /g, "")} onClick={()=>removeAvailable(record)}>
                                    <img src={del}/>
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div id="IndustryPersonalAvailableTableEmpty">
                    Nothing to show
                </div>
            </div>
        </div>
    </>
}

export default IndustryPersonal;