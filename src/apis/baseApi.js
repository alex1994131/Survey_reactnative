import axios from 'axios';

 export const baseUrl = 'http://192.168.104.57:8000/';
//export const baseUrl = 'http://sv.incidi.com:8000/';

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
