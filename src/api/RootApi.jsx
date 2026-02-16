import axios from 'axios';

const serverPort = 'http://localhost:8000';

const api = axios.create({
    baseURL: serverPort
});
export {api};