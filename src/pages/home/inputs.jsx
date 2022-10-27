import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from "react";
import { getContact } from "../../services/api";
import { useEffect } from "react";

const FormPropsTextFields = (props) => {
    const { createContact } = useContext(AuthContext);
    const [users, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [celular, setCel] = useState("");
    const [whatsapp, setWhats] = useState("");
    const [email, setEmail] = useState("");

    let user = props.user;
    async function update() {
        try {
            return new Promise((resolve) => {
                const res = getContact(user);
                resolve(res);
            });
        } catch {
            console.log("err");
        }
    }

    useEffect(() => {
        (async () => {
            const res = await update();
            console.log(res.data);
            setUser(res);
            setLoading(false);
        })();
    }, []);

    const handleCadContacts = (e) => {
        e.preventDefault();
        console.log("first 1", { name, celular, whatsapp, email });

        createContact(name, celular, whatsapp, email);

        props.refresh();
    };

    return (
        <div>
            {users ? (
                <Box
                    component="form"
                    onSubmit={handleCadContacts}
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="nome"
                        autoComplete="current-nome"
                        value={users.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-celular-input"
                        label="celular"
                        autoComplete="current-celular"
                        value={users.celular}
                        onChange={(e) => setCel(e.target.value)}
                    />
                    <TextField
                        id="outlined-celular-input"
                        label="whatsapp"
                        autoComplete="current-whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhats(e.target.value)}
                    />
                    <TextField
                        id="outlined-celular-input"
                        label="email"
                        type="email"
                        autoComplete="current-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        sx={{ mt: 2, width: "53%" }}
                        variant="contained"
                        color="success"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </Box>
            ) : (
                <div></div>
            )}
        </div>
    );
};
export default FormPropsTextFields;
