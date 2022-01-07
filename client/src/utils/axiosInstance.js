import axios from "axios";

const axiosApiInstance = axios.create();

// axios configuration

axiosApiInstance.defaults.baseURL = "http://localhost:4000";
axiosApiInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosApiInstance.defaults.withCredentials = true;

//intercepts requests

axiosApiInstance.interceptors.request.use(
  (config) => {
    console.log("A request has been made!");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
