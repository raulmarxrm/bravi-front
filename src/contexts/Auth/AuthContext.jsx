import { Alert } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createContacts, createSession, updateContact } from "../../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoverUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        if (recoverUser && token) {
            setUser(JSON.parse(recoverUser))
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const res = await createSession(email, password);
        const logger = res.data.user;
        const token = res.data.token;
        localStorage.setItem("user", JSON.stringify(logger))
        localStorage.setItem("token", token)
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(logger)
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        setUser(null)
        navigate("/login");
    };

    const createContact = async (name,celular,whatsapp,email) => {
        await createContacts(name,celular,whatsapp,email);                
    };

    const updateContacts = async (id,name,celular,whatsapp,email) => {
        await updateContact(id,name,celular,whatsapp,email)
                             
    };


    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout,createContact,updateContacts }}
        >
            {children}
        </AuthContext.Provider>
    );
};
