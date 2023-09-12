// api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.planboard.in",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const summary = axios.create({
//   baseURL: 'https://api.planboard.in/api/Summary/FYData',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Modify config before sending
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Modify response data before resolving
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      // Refresh token and retry the request
      //   await refreshToken();
      //   return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
