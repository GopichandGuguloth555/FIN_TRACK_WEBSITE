import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/sessionExpired") {
        window.location.href = "/sessionExpired";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
