import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const recoverUser = localStorage.getItem('user')
        if(recoverUser){
            setUser(JSON.parse(recoverUser))
        }
        setLoading(false)
    },[])

    const login = async(email, password) => {
        const res = await createSession(email,password);
        console.log("first", res.data);
        const logger = res.data.user;
        localStorage.setItem("user", JSON.stringify(logger))

        setUser(logger)
        navigate("/");
    };

    const logout = () => {
        console.log("lougot");
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login");
    };
    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user,loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
