import React, { useContext, useState } from 'react'
import { UserContext } from "../userContext";

export const Register = ({ setCanvi }) => {
  let [formulari, setFormulari] = useState({});
  let [missatge, setMissatge] = useState("");
  let { authToken,setAuthToken } = useContext(UserContext)

  const handleChange = (valuesForm) => {
    valuesForm.preventDefault();
    
    setFormulari({
      ...formulari,
      [valuesForm.target.name]: valuesForm.target.value
    });
  };
  const handleRegister = async (valuesForm) => {
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
          alert("⛔ Els passwords han de coincidir ⛔");
          return false;
      }
      try{

            const data = await fetch("https://backend.insjoaquimmir.cat/api/register", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                // Si els noms i les variables coincideix, podem simplificar
                body: JSON.stringify({ name:Rname, email: Remail, password: Rpassword })
            })
            const resposta = await data.json();
                console.log(resposta);
                if (resposta.success === true) {
                    console.log(resposta.authToken);
                    setAuthToken(resposta.authToken)
                }else{
                    setMissatge=(resposta.message);
                }
        }catch{
            console.log(data);
            alert("ERROR:Pot ser que no estiguis connectat a la xarxa");
        }
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

                    {missatge? <div className='AlertError'>{missatge}</div>:<></>}
                    
                    <button
                        onClick={(valuesForm) => {
                            handleRegister(valuesForm);
                        }}
                        >
                        Registrate
                    </button>
                    <button
                    onClick={() => {
                      setCanvi(true);
                    }}
                    >
                    Ir al Login
                    </button>
                </form>
            </div>
    </>
  )

}