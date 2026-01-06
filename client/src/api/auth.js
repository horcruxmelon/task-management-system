import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api"
})
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const changePassword = (data) => API.post("/auth/change-password", data);
export const updateProfile = (data) => API.put("/auth/profile", data);
export const getDashboard = () => API.get("/dashboard");