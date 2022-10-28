import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { deletaContacts, getUsers } from "../../services/api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VisibilityIcon from '@mui/icons-material/Visibility';


import { Backdrop, Box, Button, Container, Fade, Modal } from "@mui/material";
import TransitionsModal from "./modal";
import FormPropsTextFields from "./inputs";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};
var idUser;
var edit = false;
var visibility = false;

export const Home = () => {
    const [secondary] = useState(false);

    const { logout } = useContext(AuthContext);
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = (id,flag) => {
        idUser = id;
        if(flag === 'visible'){
            visibility = true
            edit=false
        }
        if(flag === 'edit'){
            visibility = false
            edit = true
        }

        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    function refresh() {
        setAtualizar(!atualizar);
    }
    useEffect(() => {
        (async () => {
            const res = await getUsers()
            setUser(res.data);
            setLoading(false);
        })();
    }, [atualizar]);

    const handlerLogout = (e) => {
        logout();
    };

    const handleDelete = (id) => {
        const res = deletaContacts(id)
        console.log(res);
        refresh();
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box>
                <Grid>
                    <Typography
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Lista de Contatos
                    </Typography>
                    <TransitionsModal>
                        <FormPropsTextFields refresh={refresh} />
                    </TransitionsModal>
                    <List>
                        {users.map((user) => (
                            <ListItem
                                key={user.id}
                                secondaryAction={
                                    <>
                                        <IconButton
                                            edge="end"
                                            value={user.id}
                                            aria-label="delete"
                                            onClick={() =>
                                                handleOpen(user.id,'visible')
                                                
                                            }
                                            type="submit"
                                        >
                                            <VisibilityIcon color="action" />
                                        </IconButton>
                                        <IconButton
                                            value={user.id}
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => {
                                                handleOpen(user.id,'edit')
                                            }}
                                            type="submit"
                                        >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    secondary={
                                        secondary ? "Secondary text" : null
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={() => handlerLogout()}>
                        <ExitToAppIcon />
                    </Button>
                </Grid>
            </Box>
            {open ? (
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <FormPropsTextFields refresh={refresh} user={idUser} edit={edit} visibility={visibility} />
                        </Box>
                    </Fade>
                </Modal>
            ) : (
                false
            )}
        </Container>
    );
};
