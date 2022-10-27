import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { getUsers } from '../../services/api'
import Corpo from '../login/corpo'

export const Home = () => {
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
        <>
            <h1>home</h1>
            <Corpo incremente={handlerLogout} />
            <ul>
                {
                    users.map((user)=>(
                         <li key={user.id}>
                            {user.name}
                         </li>
                    ))
                }
            </ul>
        </>
    )
}
