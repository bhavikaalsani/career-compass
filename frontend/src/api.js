// frontend/src/api.js
import axios from "axios";

// Use environment variable if set (e.g. VITE_API_URL or REACT_APP_API_URL)
const baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const API = axios.create({ baseURL });

// Automatically add token (if logged in)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
