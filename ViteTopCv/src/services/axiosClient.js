import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

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
    const token =
      localStorage.getItem("access_token");

    console.log("===== API REQUEST =====");
    console.log(
      "URL:",
      config.baseURL + config.url
    );
    console.log("METHOD:", config.method);
    console.log("TOKEN:", token);
    console.log("DATA:", config.data);

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization
    );

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error("===== API ERROR =====");
    console.error(
      "STATUS:",
      error.response?.status
    );

    console.error(
      "DATA:",
      error.response?.data
    );

    console.error(
      "HEADERS:",
      error.response?.headers
    );

    return Promise.reject(error);
  }
);

export default axiosClient;