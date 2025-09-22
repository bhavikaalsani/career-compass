import axios from "axios";

// Make sure this is your deployed backend URL
const API = axios.create({
  baseURL: "https://career-compass-13.onrender.com/api",
});

// Optional: automatically attach token if you have authentication
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
