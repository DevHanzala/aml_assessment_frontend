import axios from "axios";
import { useAuthStore } from "./authStore";

const api = axios.create({
baseURL: import.meta.env.VITE_BACKEND_URL || "https://amlassesment.techmiresolutions.com",
});

// Auto-add Bearer token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;