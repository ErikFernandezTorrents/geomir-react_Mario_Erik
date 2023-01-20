import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext';
import { Login } from './Login'
import { Register } from './Register'

export const LoginRegister = () => {
    let [isLogin, setLogin] = useState(true);
    let { authToken,setAuthToken } = useContext(UserContext)
        
    return (
        <>
            {isLogin? <Login setCanvi={setLogin}/> : <Register setCanvi={setLogin}/>}
        </>
    )
}
