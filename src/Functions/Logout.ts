import axios from 'axios';


export default(async function logout() {
    const response = await axios.get('/logout');
    console.log(response.data);
    window.location.href = '/';
});