import React from 'react'
import { useState } from "react";


export const LoginRegister = () => {
    let [isLogin, setLogin] = useState(true);
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [formulari, setFormulari] = useState({});

    if (isLogin==true) {
        const sendLogin = (e) => {
            e.preventDefault();

            alert("He enviat les Dades:  " + name + "/" + password);
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
        
                        <label for="username">Email</label>
                        <input type="text" placeholder="Email addres" name="email"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}></input>
        
                        <label for="password">Password</label>
                        <input type="password" placeholder="Password" name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                          }}></input>
        
                        <button
                            onClick={(e) => {
                                sendLogin(e);
                            }}
                            >
                            Login
                        </button>
                        <div className="social">
                            <button class="button"href="#">Forgot your password?</button>
                            <button
                                onClick={() => {
                                    setLogin(false);
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
    else{
        const handleChange = (valuesForm) => {
            valuesForm.preventDefault();
        
            setFormulari({
              ...formulari,
              [valuesForm.target.name]: valuesForm.target.value
            });
          };
        const handleRegister = (valuesForm) => {
            valuesForm.preventDefault();
        
            let { name, password, password2, email } = formulari;
            alert(
                "He enviat les Dades:  " +
                name +
                "/" +
                email +
                "/" +
                password +
                "/" +
                password2
            );
        };
        return(
            <>
                <div className="background">
                        <div className="shape"></div>
                        <div className="shape"></div>
                </div>
                    <div>
                        <form id="RegisterForm">
                            <h3>Register</h3>
            
                            <label for="username">Username</label>
                            <input type="text" placeholder="Name" name="username"onChange={handleChange}></input>
            
                            <label for="username">Email</label>
                            <input type="text" placeholder="Email addres" name="email"onChange={handleChange}></input>
            
                            <label for="password">Password</label>
                            <input type="password" placeholder="Password" name="password"onChange={handleChange}></input>
                            
                            <label for="password">Confirm Password</label>
                            <input type="password" placeholder="Password" name="password2"onChange={handleChange}></input>

                            <button
                                onClick={(valuesForm) => {
                                    handleRegister(valuesForm);
                                }}
                                >
                                Registrate
                            </button>
                            <button
                            onClick={() => {
                                setLogin(true);
                            }}
                            >
                            Ir al Login
                            </button>
                        </form>
                    </div>
            </>
        )
    }

}
