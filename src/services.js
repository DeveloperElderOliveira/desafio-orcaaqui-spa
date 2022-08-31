import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/"
});

axiosInstance.interceptors.request.use(
    function(config) {
        const token = window.localStorage.token;
        if(token) {
            config.headers.Authorization = token
        }
        return  config;
    }
);

export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint);
    },
    post(endpoint,body) {
        return axiosInstance.post(endpoint,body,
        {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
    },
    put(endpoint,body) {
        return axiosInstance.put(endpoint,body);
    },
    delete(endpoint) {
        return axiosInstance.delete(endpoint);
    },
    login(body) {
        return axios.post("http://localhost:8000/api/login",body);
    },

};