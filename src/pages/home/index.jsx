import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import Corpo from '../login/corpo'

export const Home = () => {
    const {logout} = useContext(AuthContext)
    const handlerLogout = () =>{
        logout()
    }


    return (
        <>
        <h1>home</h1>
        <Corpo incremente={handlerLogout}/>        
        </>
    )  
}
