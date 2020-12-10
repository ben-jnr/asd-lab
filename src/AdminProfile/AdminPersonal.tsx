import React from 'react';

function AdminPersonal(data:any) {
    return<>
        <div id="AdminPersonal" className='activeWindow'>
            <div className='AdminProfileSubHeading'><strong>Admin Info</strong></div>
            <table id="AdminPersonalTable">
                <tbody>
                    <tr> 
                        <td className="AdminPersonalTableLeft"><strong>ID</strong></td>  
                        <td><strong>:</strong></td>  
                        <td className="AdminPersonalTableRight"><strong>{data.data.id}</strong></td> </tr>
                    <tr> 
                        <td className="AdminPersonalTableLeft"><strong>Username</strong></td>
                        <td><strong>:</strong></td>  
                        <td className="AdminPersonalTableRight"><strong>@{data.data.username}</strong></td> 
                    </tr>
                    <tr> 
                        <td className="AdminPersonalTableLeft"><strong>Name</strong></td>  
                        <td><strong>:</strong></td>  
                        <td className="AdminPersonalTableRight"><strong>{data.data.name}</strong></td> 
                    </tr>
                </tbody>    
            </table>
        </div>
    </>
}

export default AdminPersonal;