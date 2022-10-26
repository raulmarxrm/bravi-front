import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/Auth/AuthContext";
import { Home } from "./pages/home";
import Login from "./pages/login";

const AppRoutes = () => {
    const Private = ({children}) =>{
        const {authenticated} = useContext(AuthContext);
        if(!authenticated){
            <Navigate to="/login" />
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
