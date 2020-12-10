import React, {useEffect, useState} from 'react';
import axios from 'axios';
import $ from 'jquery';
import edit from '../Images/edit.svg';
import del from '../Images/delete.svg';
import approved from '../Images/approved2.svg';


function AdminScrap() {

    const [scrap, setScrap] = useState([{id:"", name:"",type:"",hazard:""}]);


    async function getScrap() {
        const response = await axios.get('/admin/scrap');
        if(typeof response.data === 'object') {
            setScrap(response.data);
        }
        else {
            console.log(response.data);
        }
    }



    async function addScrap() {
        if($("#AdminScrapAddName").val() !== "" && $("#AdminScrapAddType").val() != "" && $("#AdminScrapAddHazard").val() != "" ) {
            const data = {name:$("#AdminScrapAddName").val(), type:$("#AdminScrapAddType").val(), hazard:$("#AdminScrapAddHazard").val()};
            const response = await axios.post('/admin/scrap/add',data);
            if(typeof response.data === 'object') {
                setScrap(response.data);
                if(response.data.length > 0) {
                    $("#AdminScrapTable").show();
                    $("#AdminScrapTableEmpty").hide();
                }
            }
            else {
                console.log(response.data);
            }
        }
        else {
            console.log("Add scrap form incomplete");
        }
        $('#AdminScrapAddName').val("");
        $('#AdminScrapAddType').val("");
        $('#AdminScrapAddHazard').val("");
    }




    async function removeScrap(record:any) {
        const data = {id:record.id};
        const response= await axios.post('/admin/scrap/delete',data);
        if(typeof response.data === 'object') {
            setScrap(response.data);
        }
    }




    async function editScrap(record:any) {
        $("#AdminScrapName"+record.id).removeAttr("disabled");
        $("#AdminScrapType"+record.id).removeAttr("disabled");
        $("#AdminScrapHazard"+record.id).removeAttr("disabled");
        $("#AdminScrapName"+record.id).parent().css("background-color","rgba(0,0,0,0.05)");
        $("#AdminScrapType"+record.id).parent().css("background-color","rgba(0,0,0,0.05)");
        $("#AdminScrapHazard"+record.id).parent().css("background-color","rgba(0,0,0,0.05)");
        $("#AdminScrapEdit"+record.id).hide();
        $("#AdminScrapSave"+record.id).show();
    }
        




    async function saveScrap(record:any) {
        if($("#AdminScrapName" + record.id).val() !== "" && $("#AdminScrapType" + record.id).val() !== "" && $("#AdminScrapHazard" + record.id).val() !== "") {
            const data = {id: record.id, name:$("#AdminScrapName" + record.id).val(),
                type:$("#AdminScrapType" + record.id).val(), hazard:$("#AdminScrapHazard" + record.id).val()};
            const response = await axios.post('/admin/scrap/update',data);
            if(typeof response.data === 'object') {
                setScrap(response.data);
            }
            else {
                console.log(response.data);
            }
        }
        else {
            console.log("fill in all the columns")
        }
        $("#AdminScrapName"+record.id).attr("disabled","disabled");
        $("#AdminScrapType"+record.id).attr("disabled","disabled");
        $("#AdminScrapHazard"+record.id).attr("disabled","disabled");
        $("#AdminScrapName"+record.id).parent().css("background-color","rgba(0,0,0,0)");
        $("#AdminScrapType"+record.id).parent().css("background-color","rgba(0,0,0,0)");
        $("#AdminScrapHazard"+record.id).parent().css("background-color","rgba(0,0,0,0)");
        $("#AdminScrapEdit"+record.id).show();
        $("#AdminScrapSave"+record.id).hide();
    }



    useEffect(()=> {
        getScrap().then(()=>{}).catch((err)=>console.log(err));
    },[])
    


    useEffect(()=>{
        $('.AdminScrapSave').hide();
        for(let i=0;i<scrap.length;i++) {
            $("#AdminScrapId"+scrap[i].id).val(scrap[i].id);
            $("#AdminScrapName"+scrap[i].id).val(scrap[i].name);
            $("#AdminScrapType"+scrap[i].id).val(scrap[i].type);
            $("#AdminScrapHazard"+scrap[i].id).val(scrap[i].hazard);
        }
    },[scrap])




    if(scrap.length === 0) {
        $("#AdminScrapTable").hide();
        $("#AdminScrapTableEmpty").show();
    }



    return<>
        <div id="AdminScrap">
            <div id="AdminScrapAdd">
                <div className = "AdminProfileSubHeading ScrapSubHeading"><strong>Add Scrap</strong></div>
                <table id="AdminScrapAddTable">
                    <tbody>
                        <tr>
                            <td className = "AdminScrapAddTd">
                                <div className="input-field col s6">
                                    <input placeholder="Name*" id="AdminScrapAddName" className="AdminScrapAddInput" type="text"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className = "AdminScrapAddTd">
                                <div className="input-field col s6">
                                    <input placeholder="Type*" id="AdminScrapAddType" className="AdminScrapAddInput" type="text"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className = "AdminScrapAddTd">
                                <div className="input-field col s6 ">
                                    <input placeholder="Hazard*" id="AdminScrapAddHazard" className="AdminScrapAddInput" type="text"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className = "AdminScrapAddTd">
                                <a id="AdminScrapAddBtn" className="waves-effect waves-light btn" onClick={addScrap}>Go</a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="AdminScrapList">
                <div className='AdminProfileSubHeading ScrapSubHeading'><strong>Scrap</strong></div>
                <table id="AdminScrapTable">
                    <thead>
                        <tr>
                            <td className = "AdminScrapTableHeadTd"><strong>ID</strong></td>
                            <td className = "AdminScrapTableHeadTd"><strong>Name</strong></td>
                            <td className = "AdminScrapTableHeadTd"><strong>Type</strong></td>
                            <td className = "AdminScrapTableHeadTd"><strong>Hazard</strong></td>
                            <td className = "AdminScrapTableHeadTdBtn"><strong>Edit</strong></td>
                            <td className = "AdminScrapTableHeadTdBtn"><strong>Delete</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {scrap.map((record)=>(
                            <tr key={record.id}>
                                <td className = "AdminScrapTableTd">
                                    <div>
                                        <input disabled className="AdminScrapTableInput" id={"AdminScrapId" + record.id} type="text"/>
                                    </div>
                                </td>
                                <td className = "AdminScrapTableTd">
                                    <div>
                                        <input disabled className="AdminScrapTableInput" id={"AdminScrapName" + record.id} type="text"/>
                                    </div>
                                </td>
                                <td className = "AdminScrapTableTd">
                                    <div>
                                        <input disabled className="AdminScrapTableInput" id={"AdminScrapType" + record.id} type="text"/>
                                    </div>
                                </td>
                                <td className = "AdminScrapTableTd">
                                    <div>
                                        <input disabled className="AdminScrapTableInput" id={"AdminScrapHazard" + record.id} type="text"/>
                                    </div>
                                </td>
                                <td className = "AdminScrapTableTdBtn">
                                    <a className="AdminScrapBtn AdminScrapEdit waves-effect waves-light btn AdminScrapTableInput" id={"AdminScrapEdit" + record.id} onClick={()=>editScrap(record)}>
                                        <img src={edit}/>
                                    </a>
                                    <a className="AdminScrapBtn AdminScrapSave waves-effect waves-light btn AdminScrapTableInput" id={"AdminScrapSave" + record.id} onClick={()=>saveScrap(record)}>
                                        <img src={approved}/>
                                    </a>
                                </td>
                                <td className = "AdminScrapTableTdBtn">
                                    <a className="AdminScrapBtn AdminScrapDel waves-effect waves-light btn AdminScrapTableInput" id={"AdminScrapDel" + record.id} onClick={()=>removeScrap(record)}>
                                        <img src={del}/>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div id="AdminScrapTableEmpty">
                    Nothing to Show
                </div>
            </div>
        </div>
    </>
}


export default AdminScrap;