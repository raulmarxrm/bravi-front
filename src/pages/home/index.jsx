import React from 'react'
import Corpo from '../login/corpo'

export const Home = () => {
    let count= 0;
    function incremente() {
        count++
        console.log(count);
    }


    return (
        <>
        <h1>home</h1>
        <Corpo incremente={incremente}/>
        
        </>
    )  
}
