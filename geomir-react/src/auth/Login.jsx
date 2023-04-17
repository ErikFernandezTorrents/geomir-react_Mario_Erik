import React, { useState } from 'react'
import '../styles.css'
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
                    <input type="text" placeholder="Email addres"{...register("email",{
                        required:"Aquest camp és obligatori",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@(insjoaquimmir\.cat|fp\.insjoaquimmir\.cat|gmail\.com)$/i, // Expresión regular para validar el formato del email y el dominio permitido
                            message:"El correu ha de ser dels dominis @insjoaquimmir.cat, @fp.insjoaquimmir.cat o @gmail.com"
                        }
                    })}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password"{...register("password",{
                        required:"Aquest camp és obligatori",
                        pattern: {
                           // value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, // Expresión regular para validar la contraseña
                            message:"La contrasenya ha de tenir com a mínim 8 caràcters, una lletra majúscula, una minúscula, un número i un caracter especial"
                        }
                    })}></input>
                    {missatge? <div className='AlertError'>{missatge}</div>:<></>}
                    {errors.email && <div className='AlertError'>{errors.email.message}</div>}
                    {errors.password && <div className='AlertError'>{errors.password.message}</div>}
                    
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