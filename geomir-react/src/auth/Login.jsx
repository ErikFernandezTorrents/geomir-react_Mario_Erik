import React, { useState } from 'react'
import '../styles.css'
import { useForm } from '../hooks/useForm';
import useLoging  from '../hooks/useLogin';

export const Login = ({ setCanvi }) => {
    const { formState, handleChange } = useForm({
        email: "",
        password: "",
    }); 
    const {email,password} = formState
    
    
    let {sendLogin,checkAuthToken,missatge} = useLoging();

    checkAuthToken()

    return (
        <>
            <h1 id='h1Login'>Benvinguts a GEO-MIR</h1>

            <p id="eslogan">Feel Your Environment</p>
            <div className='div'>
                <form className='allForms'>
                    <h3>Login Here</h3>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email addres" name="email"
                        onChange={handleChange} value={email}></input>
    
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password"
                        onChange={handleChange} value={password}></input>

                    {missatge? <div className='AlertError'>{missatge}</div>:<></>}
                    
                    <button
                        onClick={(e) => { 
                            e.preventDefault();
                            sendLogin(email,password);
                        }}
                        >
                        Login
                    </button>
                    <div className="social">
                        <button className="button"href="#">Forgot your password?</button>
                        <button 
                            onClick={() => {
                                setCanvi(false);
                            }}
                            >
                            Registrat
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}