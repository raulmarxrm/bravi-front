import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/"
})

export const createSession = async (email, password) => {
    console.log(("login",{email,password}));
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.post("/api/login",{email,password})
}

export const getUsers = async () => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.get("/api/contacts")
}