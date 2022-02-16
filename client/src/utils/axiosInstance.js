import axios from "axios";

const axiosApiInstance = axios.create();

//defining the settings for our axios instance.

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  axiosApiInstance.defaults.baseURL = "http://localhost:4000";
} else {
  // production code
  axiosApiInstance.defaults.baseURL = "https://lilu-test.herokuapp.com";
}

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
