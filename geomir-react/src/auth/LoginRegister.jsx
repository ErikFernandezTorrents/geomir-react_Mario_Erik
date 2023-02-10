import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext';
import { Login } from './Login'
import { Register } from './Register'
import background from '../Images/City.jpg';
import "../styles.css";
export const LoginRegister = () => {
    let [isLogin, setLogin] = useState(true);
        
    return (
        <div className='bodyLoginRegister'>
            {isLogin? <Login setCanvi={setLogin}/> : <Register setCanvi={setLogin}/>}
        </div>
    )
}