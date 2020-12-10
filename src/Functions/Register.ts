import axios from 'axios';
import $ from 'jquery';

export default (async function reg() {
    const data = {
        name:$("#RegName").val(),
        username:$("#RegUsername").val(),
        password:$("#RegPassword").val(),
        location:$("#RegLocation").val(),
        contact:$("#RegPhone").val()
    };
    if(data.password === $("#RegRetypePassword").val()) {
        if(data.username === "" || data.password === "" || data.contact === "") 
            console.log("fill in required data");
        else {
            const response = await axios.post('/register', data);
            $('#RegName').val("");
            $('#RegUsername').val("");
            $('#RegPassword').val("");
            $('#RegRetypePassword').val("");
            $('#RegLocation').val("");
            $('#RegPhone').val("");
            if(typeof(response.data) === "object") 
                window.location.href = '/user/'+response.data[0].id;
            else
                console.log(response.data);
        }
    }
    else 
        console.log("password mismatch");
});