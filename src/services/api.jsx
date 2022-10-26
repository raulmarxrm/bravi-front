import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const createSession = async (email, password) => {
    return api.post("/login",{email,password})
}