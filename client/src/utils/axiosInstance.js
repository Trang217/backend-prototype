import axios from "axios";

const axiosApiInstance = axios.create();

//defining the settings for our axios instance.
axiosApiInstance.defaults.baseURL = "http://localhost:4000";
axiosApiInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosApiInstance.defaults.withCredentials = true;

//intercepts requests.
axiosApiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//intercepts responses.
axiosApiInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    //console.log("Error response has been received", error.response);
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
