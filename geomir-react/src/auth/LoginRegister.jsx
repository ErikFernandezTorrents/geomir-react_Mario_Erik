import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext';
import { Login } from './Login'
import { Register } from './Register'
import background from '../Images/City.jpg';
export const LoginRegister = () => {
    let [isLogin, setLogin] = useState(true);
        
    return (
        <div>
            {isLogin? <Login setCanvi={setLogin}/> : <Register setCanvi={setLogin}/>}
        </div>
    )
}