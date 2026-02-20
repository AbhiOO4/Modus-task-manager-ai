import axios from "axios";

const api = axios.create({
  baseURL: "https://modus-task-manager.onrender.com",
  withCredentials: true,   
});

export default api;
