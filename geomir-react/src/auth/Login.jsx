import React, { useContext, useState } from 'react'
import { UserContext } from "../userContext";
import '../styles.css'
import { useForm } from '../hooks/useForm';
export const Login = ({ setCanvi }) => {
    const { formState, handleChange } = useForm({
        email: "",
        password: "",
    }); 
    const {email,password} = formState

    let [missatge, setMissatge] = useState("");
    let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
    const sendLogin = async (e) => {
        e.preventDefault();
        console.log("Comprovant credencials....");

        // Enviam dades a l'aPI i recollim resultat
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ email: email, password: password })
            })
            const resposta = await data.json();
                console.log(resposta);
                if (resposta.success === true) {
                    setAuthToken(resposta.authToken)
                    localStorage.setItem('authToken', authToken);
                    setUsuari(email)
                    console.log(resposta.authToken,usuari);
                }else{
                    setMissatge(resposta.message);
                }

        }catch {
            console.log(data);
            console.log("Internet perdut");
        }
        console.log("He enviat les Dades:  " + email + "/" + password);
    };
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
                            sendLogin(e);
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