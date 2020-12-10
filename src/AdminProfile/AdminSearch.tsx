import React, {useState} from 'react';
import axios from 'axios';
import $ from 'jquery';




function AdminSearch(data:any) {

    const [search, setSearch] = useState([{id:"",username:"",name:"",location:"",contact:""}]);


    const criteriaChange = (data:any) => {
        $("#AdminSearchQuery").val("");
        $("#AdminSearchQuery").removeAttr("disabled");
        $("#AdminSearchResultTable").hide();
        $("#AdminSearchResultTableEmpty").show();
        if($("#AdminSearchSelect").val() === "scrap")
            $("#AdminSearchQuery").attr("placeholder","enter scrap");
        else if($("#AdminSearchSelect").val() === "name")
            $("#AdminSearchQuery").attr("placeholder","enter name");    
        else if($("#AdminSearchSelect").val() === "location")
            $("#AdminSearchQuery").attr("placeholder","enter location");
        else if($("#AdminSearchSelect").val() === "your approvals") {
            $("#AdminSearchQuery").val(data.data.id);
            $("#AdminSearchQuery").attr("disabled", "disabled");
        }
        else {
            $("#AdminSearchQuery").attr("placeholder","select an option");
            $("#AdminSearchQuery").attr("disabled", "disabled");
        }
    }
    


    async function submitAdminSearch(){
        if($("#AdminSearchSelect").val() === "Choose your option")
            console.log("select criteria incomplete");
        else {
            data = {criteria: $("#AdminSearchSelect").val() , query: $("#AdminSearchQuery").val()};
            const response = await axios.post("/admin/search",data); 
            if(typeof response.data === 'object') {
                setSearch(response.data);
                if(response.data.length !== 0) {
                    $("#AdminSearchResultTable").show();
                    $("#AdminSearchResultTableEmpty").hide();
                }
            }
            else {
                setSearch([]);
                console.log(response.data);
            }
        }
    }



    if(search.length === 0) {
        $("#AdminSearchResultTable").hide();
        $("#AdminSearchResultTableEmpty").show();
    }
    


    const generateBody=()=> {
        if(search.length === 0) {
            return(<tbody></tbody>)
        }
        else {
            return(
                <tbody>
                    {search.map((record)=>(
                            <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.username}</td>
                            <td>{record.name}</td>
                            <td>{record.location}</td>
                            <td>{record.contact}</td>
                        </tr>
                    ))}
                </tbody>
            )
        }
    }

    return<>
        <div id="AdminSearch">
            <table id="AdminSearchTable">
                <tbody>
                    <tr className="NoBorder">
                        <td><strong>Search Criteria</strong></td>
                        <td><strong>:</strong></td>
                        <td>
                            <select id="AdminSearchSelect" onChange={() => criteriaChange(data)} className="browser-default">
                                <option defaultValue="">Choose your option</option>
                                <option value="name">Name</option>
                                <option value="scrap">Scrap</option>
                                <option value="location">Location</option>
                                <option value="your approvals">Your Approvals</option>
                            </select>
                        </td>
                        <td><strong>:</strong></td>
                        <td>
                            <div className="input-field col s6">
                                <input disabled placeholder="select an option" id="AdminSearchQuery" type="text"/>
                            </div>
                        </td>
                        <td>
                            <a id="AdminSearchBtn" className="waves-effect waves-light btn" onClick={submitAdminSearch}>Go</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table id="AdminSearchResultTable">
                <thead>
                    <tr>
                        <td><strong>ID</strong></td>
                        <td><strong>Username</strong></td>
                        <td><strong>Name</strong></td>
                        <td><strong>Location</strong></td>
                        <td><strong>Contact</strong></td>
                    </tr>
                </thead>
                {generateBody()}
            </table>
            
            <div id="AdminSearchResultTableEmpty">
                Nothing to Show
            </div>
        </div>
    </>
}

export default AdminSearch;