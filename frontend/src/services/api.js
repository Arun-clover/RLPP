import axios from "axios";
import { API_URL } from "../config";

const api=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

export const register= async (userdata)=>{
    try{
    const response=await api.post('/registration',userdata);
    return response.data;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
};

export const login =async (userdata)=>
{
    try{
        const response=await api.post('/Login',userdata);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const protecteddata=async ()=>{
    try{
        const response= await api.get('/page2');
        return response.data;
    }catch(error){
        throw error.response?.data || error.message
    }
}