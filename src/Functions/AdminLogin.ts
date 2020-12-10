import axios from 'axios';
import $ from 'jquery';

export default(async function login() {
  const data = {
    username:$("#AdminLoginUsername").val(),
    password:$("#AdminLoginPassword").val()
  };
  if(data.username === "" || data.password === "") 
    console.log("fill in required data");
  else {
    const response = await axios.post('/admin/login', data);
    $('#AdminLoginUsername').val("");
    $('#AdminLoginPassword').val("");
    if(typeof(response.data) === "object")
      window.location.href = '/admin/profile/';
    else
      console.log(response.data);
  }
});