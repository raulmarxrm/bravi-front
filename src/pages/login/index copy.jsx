import React, { useState,useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import "./style.css";


const Login = () => {
    const{authenticated,login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    };
    return (
        <div className="main">
            <div className="sub-main">
                <div>
                    <div>
                        <h1>Login Page</h1>
                        <form action="form" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="name"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="second-input">
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="name"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="login-button">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
