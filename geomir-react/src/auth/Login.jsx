import React, { useState } from 'react'
import '../styles.css'
//import { useForm } from '../hooks/useForm';
import { useForm } from "react-hook-form";
import useLogin  from '../hooks/useLogin';

export const Login = ({ setCanvi }) => {
    /* const { formState, handleChange } = useForm({
        email: "",
        password: "",
    });  */
    //const {email,password} = formState
    const { register, handleSubmit,formState: { errors }} = useForm();
    const {sendLogin,checkAuthToken,missatge} = useLogin();
    const onSubmit = data => sendLogin(data);

    checkAuthToken()

    return (
        <>
            <h1 id='h1Login'>Benvinguts a GEO-MIR</h1>

            <p id="eslogan">Feel Your Environment</p>
            <div className='div'>
                <form className='allForms'>
                    <h3>Login Here</h3>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email addres"{...register("email")}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password"{...register("password")}></input>
                    {missatge? <div className='AlertError'>{missatge}</div>:<></>}
                    
                    <button onClick={handleSubmit(onSubmit)}>
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