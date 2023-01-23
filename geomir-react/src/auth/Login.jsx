import React, { useState } from 'react'
import { UserContext } from "./userContext";

export const Login = ({ setCanvi }) => {
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [missatge, setMissatge] = useState("");

    const sendLogin = (e) => {
        e.preventDefault();
        console.log("Comprovant credencials....");

        // Enviam dades a l'aPI i recollim resultat
        fetch("http://127.0.0.1:8000/api/login", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email: name, password: password })
        })
        .then((data) => data.json())
        .then((resposta) => {
            console.log(resposta);
            if (resposta.success === true) {
                localStorage.setItem('Token', resposta.authToken);
                console.log(resposta.authToken);
            }else{
                setMissatge(resposta.message);
            }
        })
        .catch((data) => {
            console.log(data);
            console.log("Catchch");
        });
        console.log("He enviat les Dades:  " + name + "/" + password);
    };
    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div>
                <form>
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
