import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createContacts, createSession } from "../../services/api";

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
        console.log("first", res.data);
        const logger = res.data.user;
        const token = res.data.token;
        localStorage.setItem("user", JSON.stringify(logger))
        localStorage.setItem("token", token)
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(logger)
        navigate("/");
    };

    const logout = () => {
        console.log("lougot");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        setUser(null)
        navigate("/login");
    };

    const createContact = async (name,celular,whatsapp,email) => {
        const res = await createContacts(name,celular,whatsapp,email);                
    };


    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout,createContact }}
        >
            {children}
        </AuthContext.Provider>
    );
};
