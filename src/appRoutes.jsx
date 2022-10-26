import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import { Home } from "./pages/home";
import Login from "./pages/login";

const AppRoutes = () => {

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
