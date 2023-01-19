import React, { useState } from 'react'


export const LoginRegister = () => {
    let [isLogin, setLogin] = useState(true);
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [formulari, setFormulari] = useState({});

    if (isLogin==true) {
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
                    console.log(resposta.authToken);
                }else{
                    alert("Credenciales Incorrectas Falta E-mail 📨 o Password 🔐");
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
                        <div className="error alert alert-danger alert-dismissible fade"></div>
        
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                          }}></input>
                        <div className="error alert alert-danger alert-dismissible fade"></div>
        
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
        
            let { Rname, Remail ,Rpassword, Rpassword2 } = formulari;
            console.log(
                "He enviat les Dades:  " +
                Rname +
                "/" +
                Remail +
                "/" +
                Rpassword +
                "/" +
                Rpassword2
            );
            if (Rpassword2 !== Rpassword) {
                console.log("⛔ Els passwords han de coincidir ⛔");
                return false;
            }
            fetch("http://127.0.0.1:8000/api/register", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                // Si els noms i les variables coincideix, podem simplificar
                body: JSON.stringify({ Rname, Remail, Rpassword })
                })
                .then((data) => data.json())
                .then((resposta) => {
                    console.log(resposta);
                    if (resposta.success === true) {
                        console.log(resposta.authToken);
                        localStorage.setItem('Token', resposta.authToken);
                    }else{
                        alert("⛔ Faltan campos obligatorios a rellenar !!");
                    }
                })
                .catch((data) => {
                    console.log(data);
                    alert("ERROR:Pot ser que no estiguis connectat a la xarxa");
                });
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
            
                            <label htmlFor="name">Username</label>
                            <input type="text" placeholder="Name" name="Rname"onChange={handleChange}></input>
            
                            <label htmlFor="username">Email</label>
                            <input type="text" placeholder="Email addres" name="Remail"onChange={handleChange}></input>
            
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Password" name="Rpassword"onChange={handleChange}></input>
                            
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" placeholder="Password" name="Rpassword2"onChange={handleChange}></input>

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
