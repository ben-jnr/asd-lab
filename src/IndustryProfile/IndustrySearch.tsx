import React, {useState} from 'react';
import axios from 'axios';
import $ from 'jquery';




function IndustrySearch(data:any) {

    const [search, setSearch] = useState([{id:"",username:"",name:"",location:"",contact:""}]);


    const criteriaChange = (data:any) => {
        $("#IndustrySearchQuery").val("");
        $("#IndustrySearchQuery").removeAttr("disabled");
        $("#IndustrySearchResultTable").hide();
        $("#IndustrySearchResultTableEmpty").show();
        if($("#IndustrySearchSelect").val() === "scrap")
            $("#IndustrySearchQuery").attr("placeholder","enter scrap");
        else if($("#IndustrySearchSelect").val() === "name")
            $("#IndustrySearchQuery").attr("placeholder","enter name");    
        else if($("#IndustrySearchSelect").val() === "location")
            $("#IndustrySearchQuery").attr("placeholder","enter location");
        else {
            $("#IndustrySearchQuery").attr("placeholder","select an option");
            $("#IndustrySearchQuery").attr("disabled", "disabled");
        }
    }
    


    async function submitIndustrySearch(){
        if($("#IndustrySearchSelect").val() === "Choose your option")
            console.log("select criteria incomplete");
        else {
            data = {criteria: $("#IndustrySearchSelect").val() , query: $("#IndustrySearchQuery").val()};
            const response = await axios.post("/industry/search",data); 
            if(typeof response.data === 'object') {
                setSearch(response.data);
                if(response.data.length !== 0) {
                    $("#IndustrySearchResultTable").show();
                    $("#IndustrySearchResultTableEmpty").hide();
                }
            }
            else {
                setSearch([]);
                console.log(response.data);
            }
        }
    }



    if(search.length === 0) {
        $("#IndustrySearchResultTable").hide();
        $("#IndustrySearchResultTableEmpty").show();
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
        <div id="IndustrySearch">
            <table id="IndustrySearchTable">
                <tbody>
                    <tr className="NoBorder">
                        <td><strong>Search Criteria</strong></td>
                        <td><strong>:</strong></td>
                        <td>
                            <select id="IndustrySearchSelect" onChange={() => criteriaChange(data)} className="browser-default">
                                <option defaultValue="">Choose your option</option>
                                <option value="name">Name</option>
                                <option value="scrap">Scrap</option>
                                <option value="location">Location</option>
                            </select>
                        </td>
                        <td><strong>:</strong></td>
                        <td>
                            <div className="input-field col s6">
                                <input disabled placeholder="select an option" id="IndustrySearchQuery" type="text"/>
                            </div>
                        </td>
                        <td>
                            <a id="IndustrySearchBtn" className="waves-effect waves-light btn" onClick={submitIndustrySearch}>Go</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table id="IndustrySearchResultTable">
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
            
            <div id="IndustrySearchResultTableEmpty">
                Nothing to Show
            </div>
        </div>
    </>
}

export default IndustrySearch;