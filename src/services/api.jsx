import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/"
})

export const createSession = async (email, password) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.post("/api/login",{email,password})
}

export const getUsers = async() => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.get("/api/contacts")
}

export const createContacts = async (name,celular,whatsapp,email) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.post("/api/contacts",{name,celular,whatsapp,email})
}

export const deletaContacts = async (id) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.delete(`/api/contacts/${id}`)
}

export const getContact = async (id) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.get(`/api/contacts/${id}`)
}

export const updateContact = async (id,name,celular,whatsapp,email) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return api.put(`/api/contacts/${id}`,{name,celular,whatsapp,email})
}