import axios from "axios";

const api = axios.create({
  baseURL: "https://modus-task-manager.onrender.com/api",
  withCredentials: true,   
});

export default api;
