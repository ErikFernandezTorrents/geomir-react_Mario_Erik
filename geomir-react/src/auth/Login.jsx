import React, { useContext, useState } from 'react'
import { UserContext } from "../userContext";
import '../styles.css'
export const Login = ({ setCanvi }) => {
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
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
                body: JSON.stringify({ email: name, password: password })
            })
            const resposta = await data.json();
                console.log(resposta);
                if (resposta.success === true) {
                    setAuthToken(resposta.authToken)
                    setUsuari(name)
                    console.log(resposta.authToken,usuari);
                }else{
                    setMissatge(resposta.message);
                }

        }catch {
            console.log(data);
            console.log("Internet perdut");
        }
        console.log("He enviat les Dades:  " + name + "/" + password);
    };
    return (
        <>
            <h1 id='h1Login'>Venvinguts a GEO-MIR</h1>
            <div className='div'>
                <form className='allForms'>
                    <h3>Login Here</h3>
    
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email addres" name="email"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}></input>
    
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                      }}></input>

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
