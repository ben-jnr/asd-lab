import axios from 'axios';

export default (async function redirection(){
        const res = await axios.get('/check');
        if(typeof res.data === 'object') {
            if(res.data[0].type === 'industry') {
                if(! window.location.href.includes("http://localhost:3000/user/profile")) {
                    window.location.href = "/user/profile/";
                    res.data[0].flag = 0;  
                    return(res.data[0]);       
                }       
            }
            else if(res.data[0].type === 'admin') {
                if(!window.location.href.includes("http://localhost:3000/admin/profile")) {
                    window.location.href = "/admin/profile/";
                    res.data[0].flag = 0;
                    return(res.data[0]);
                }    
            }
            else {
                res.data[0].flag = 0;
                return(res.data[0]);
            }
            res.data[0].flag = 1;
            return(res.data[0]);
        }
        else if(typeof res.data === 'string' && window.location.href !== "http://localhost:3000/" && window.location.href !== "http://localhost:3000/admin" ){
            window.location.href = "/";
            let response = {mssg:"", flag:0};
            response.mssg = res.data;
            return(response);
        }   
        else {
            let response = {mssg:"", flag:1};
            response.mssg = res.data;
            return(response);
        }
    } 
)();