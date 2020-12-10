import React, { useEffect, useState } from 'react';
import axios from 'axios';
import approved from '../Images/approved2.svg';
import $ from 'jquery';
import reject from '../Images/reject.svg';



function AdminApprove() {
    
    const [pending, setPending] = useState([{id:"",username:"",name:"",location:"",contact:""}]);
    

    useEffect(()=> {
        async function getPending() {
            const response = await axios.get('/admin/pending');
            if(typeof response.data === 'object')
                setPending(response.data);
            else if(typeof response.data === 'string')
                console.log(response.data);
        }
        getPending().then(()=>{}).catch((err)=>console.log(err));
    },[])


    
    async function approveUser(userID:any) {
        const data = {id:userID};
        const response = await axios.post("/admin/approve",data);
        if(typeof response.data === 'object') {
            var pendingCopy = [];
            for(let i=0;i<pending.length;i++) {
                if(pending[i].id !== userID)
                    pendingCopy.push(pending[i]);
            }
            setPending(pendingCopy);
        }
        else
            console.log(response.data);
    }



    async function rejectUser(userID:any) {
        const data = {id:userID};
        const response = await axios.post("/admin/reject",data);
        if(typeof response.data === 'object') {
            var pendingCopy = [];
            for(let i=0;i<pending.length;i++) {
                if(pending[i].id !== userID)
                    pendingCopy.push(pending[i]);
            }
            setPending(pendingCopy);
        }
        else
            console.log(response.data);
    }




    if(pending.length === 0) {
        $("#AdminApproveTable").css("display","none");
        $("#AdminApproveTableEmpty").css("display","block");
    }

    return<>
        <div id="AdminApprove">
            <div className='AdminProfileSubHeading'><strong>Pending Approvals</strong></div>
            <table id="AdminApproveTable">
                <thead>
                    <tr>
                        <td className='AdminApproveTd'><strong>ID</strong></td>
                        <td className='AdminApproveTd'><strong>Username</strong></td>
                        <td className='AdminApproveTd'><strong>Name</strong></td>
                        <td className='AdminApproveTd'><strong>Location</strong></td>
                        <td className='AdminApproveTd'><strong>Contact</strong></td>
                        <td className='AdminApproveBtnTd'><strong>Approve</strong></td>
                        <td className='AdminApproveBtnTd'><strong>Reject</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {pending.map((record)=>(
                        <tr key={record.id}>
                            <td className='AdminApproveTd'>{record.id}</td>
                            <td className='AdminApproveTd'>{record.username}</td>
                            <td className='AdminApproveTd'>{record.name}</td>
                            <td className='AdminApproveTd'>{record.location}</td>
                            <td className='AdminApproveTd'>{record.contact}</td>
                            <td className='AdminApproveBtnTd'><a className="AdminApproveBtn waves-effect waves-light btn" onClick={()=>approveUser(record.id)}><img src={approved}/></a></td>
                            <td className='AdminApproveBtnTd'><a className="AdminApproveBtn waves-effect waves-light btn" onClick={()=>rejectUser(record.id)}><img src={reject}/></a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="AdminApproveTableEmpty">
                Nothing to Show
            </div>
        </div>
    </>
}

export default AdminApprove;