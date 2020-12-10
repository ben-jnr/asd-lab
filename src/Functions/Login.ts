import axios from 'axios';

export default (async function login() {
    const data = {
      username:$("#LoginUsername").val(),
      password:$("#LoginPassword").val()
    };
    if(data.username === "" || data.password === "") 
      console.log("fill in required data");
    else {
      const response = await axios.post('/login', data);
      $('#LoginUsername').val("");
      $('#LoginPassword').val("");
      if(typeof(response.data) === "object")
        window.location.href = '/user/profile/';
      else
        console.log(response.data);
    }
  }
);