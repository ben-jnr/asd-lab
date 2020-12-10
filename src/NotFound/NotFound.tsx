import React, {useEffect, useState} from 'react';
import axios from 'axios';

function NotFound() {
    
    const [flag,setFlag] = useState(0);
  
    useEffect(()=>{
        async function redirection(){
            const res = await axios.get('/check');
            if(typeof res.data === 'object') {
                if(res.data[0].type === 'industry') {
                    window.location.href = "/user/profile/";  
                    return(0);       
                }       
                else if(res.data[0].type === 'admin') {
                    window.location.href = "/admin/profile/";
                    return(0);
                }    
                else
                    return(1);
            }
            else if(typeof res.data === 'string' && window.location.href !== "http://localhost:3000/" && window.location.href !== "http://localhost:3000/admin" ){
                window.location.href = "/";
                console.log(res.data);
                return(0);
            }   
            else {
                console.log(res.data);
                return(1);
            }
        }

        redirection().then((res)=>setFlag(res)).catch((err)=>console.log(err));
    },[])
    

    if(flag === 1)
        return<>
            <div>
                Page Not Found
            </div>
        </>
    else
        return<><div></div></>
}

export default NotFound;
