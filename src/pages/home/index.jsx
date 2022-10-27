import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { getUsers } from '../../services/api'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { styled } from '@mui/material/styles';
import { Box, Button, Container } from '@mui/material';
import TransitionsModal from './modal';
import FormPropsTextFields from './inputs';


// function generate(element: ReactElement) {
//     return [0, 1, 2].map((value) =>
//       React.cloneElement(element, {
//         key: value,
//       }),
//     );
//   }

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export const Home = () => {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    const { logout } = useContext(AuthContext)
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const res = await getUsers();
            setUser(res.data)
            setLoading(false)
        })()
    }, [])

    const handlerLogout = () => {
        logout()
    }
    if (loading) {
        return <div className="loading">Carregando...</div>
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box>
                <Grid>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Lista de Contatos
                    </Typography>
                    <TransitionsModal>
                        <FormPropsTextFields />
                    </TransitionsModal>
                    <List fullWidth dense={dense}>
                        {
                            users.map((user) => (
                                <ListItem
                                    secondaryAction={
                                        <>
                                            <IconButton edge="end" aria-label="delete">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
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
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                    <Button onClick={() => handlerLogout()}>
                        <ExitToAppIcon />
                    </Button>
                </Grid>
            </Box>
        </Container>
    )
}
