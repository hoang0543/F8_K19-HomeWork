import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

console.log(
  "API BASE URL:",
  API_BASE_URL
);

const axiosClient = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log(
      "API REQUEST:",
      `${config.baseURL}${config.url}`,
      config.params || ""
    );

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log(
      "API RESPONSE:",
      response.status,
      response.data
    );

    return response;
  },

  (error) => {
    console.error(
      "API ERROR:",
      error.response?.status,
      error.response?.data ||
        error.message
    );

    return Promise.reject(error);
  }
);

export default axiosClient;