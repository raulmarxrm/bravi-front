import React,{ useContext } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/Auth/AuthContext";
import { Home } from "./pages/home";
import Login from "./pages/login";

const AppRoutes = () => {
    const Private = ({children}) =>{
        const {authenticated,loading } = useContext(AuthContext);
        if(loading){
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated){
            return <Navigate to="/login" />
        }
        return children;
    }
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Private><Home /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
