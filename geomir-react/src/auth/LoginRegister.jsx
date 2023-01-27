import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext';
import { Login } from './Login'
import { Register } from './Register'
import '../styles.css'
import background from '../Images/City.jpg'
export const LoginRegister = () => {
    let [isLogin, setLogin] = useState(true);
    let { authToken,setAuthToken } = useContext(UserContext)
        
    return (
        <div>
            {isLogin? <Login setCanvi={setLogin}/> : <Register setCanvi={setLogin}/>}
        </div>
    )
}
