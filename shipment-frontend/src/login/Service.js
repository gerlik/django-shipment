import axios from 'axios';

const TOKEN_URL = 'http://localhost:8000/api/token/';

const obtainToken = (data) => axios.post(TOKEN_URL, data);

export {obtainToken};
