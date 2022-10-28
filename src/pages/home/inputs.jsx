import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from "react";
import { getContact } from "../../services/api";
import { useEffect } from "react";

const FormPropsTextFields = (props) => {
    const { createContact, updateContacts } = useContext(AuthContext);
    const [users, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [celular, setCel] = useState("");
    const [whatsapp, setWhats] = useState("");
    const [email, setEmail] = useState("");

    let user = props.user;

    useEffect(() => {
        const update = async () => {
            await getContact(user)
                .then((responseJson) => {
                    setName(responseJson.data.name)
                    setCel(responseJson.data.celular)
                    setWhats(responseJson.data.whatsapp)
                    setEmail(responseJson.data.email)
                })

        }
        update();
    }, [user])

    const handleCadContacts = (e) => {
        e.preventDefault();

        createContact(name, celular, whatsapp, email)

        props.refresh();
    };
    const handleUpdate = async e => {
        e.preventDefault();

        updateContacts(user, name, celular, whatsapp, email);

        props.refresh();
    };
    return (
        <Box
            component="form"
            onSubmit={props.edit ? handleUpdate : handleCadContacts}
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
        >

            {props.visibility ? (<>
                <Typography
                        sx={{ mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Detalhe de Contatos
                    </Typography>
            <TextField
                required
                disabled
                id="outlined-required"
                label="nome"
                autoComplete="current-nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
                <TextField
                    id="outlined-celular-input"
                    disabled
                    label="celular"
                    autoComplete="current-celular"
                    value={celular}
                    onChange={(e) => setCel(e.target.value)}
                />
                <TextField
                    id="outlined-celular-input"
                    disabled
                    label="whatsapp"
                    autoComplete="current-whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhats(e.target.value)}
                />
                <TextField
                    id="outlined-celular-input"
                    disabled
                    label="email"
                    type="email"
                    autoComplete="current-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /></>) : (<>
                <Typography
                        sx={{ mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Editar Contatos
                    </Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="nome"
                    autoComplete="current-nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                    <TextField
                        id="outlined-celular-input"
                        label="celular"
                        autoComplete="current-celular"
                        value={celular}
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
                    /></>)}

            {props.edit ? (
                <Button
                    sx={{ mt: 2, width: "53%" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Atualizar
                </Button>
            ) : props.visibility ? <></> : (
                <Button
                    sx={{ mt: 2, width: "53%" }}
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    Cadastrar
                </Button>
            )
            }
        </Box>

    );
};
export default FormPropsTextFields;
