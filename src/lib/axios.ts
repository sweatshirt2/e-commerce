import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    // ! Handle specific error codes (e.g., 401 for unauthorized)
    return Promise.reject(error);
  }
);

export default axiosInstance;
