import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:import.meta.env.BASEURL,
    withCredentials:true
})

axiosInstance.interceptors.request.use((config)=>{
    return config;
})

axiosInstance.interceptors.response.use((config)=>{
    return config;
})