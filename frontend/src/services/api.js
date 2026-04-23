import axios from "axios";

const API = axios.create({
    baseURL:'http://localhost:3000/api'
});

export const createSubmission = (text)=>
    API.post('/submissions/create',{text});


export const listSubmissions=()=>
    API.get('/submissions/list');