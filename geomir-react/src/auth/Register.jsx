import React, { useContext, useState } from 'react'
import { UserContext } from "../userContext";
import '../styles.css'
import { useForm } from "react-hook-form";

export const Register = ({ setCanvi }) => {
  let [missatge, setMissatge] = useState("");
  let { authToken,setAuthToken } = useContext(UserContext)
  const { register, handleSubmit,formState: { errors } } = useForm();
    /* const { formState, handleChange,OnResetForm } = useForm({
        Rname: "",
        Remail: "",
        Rpassword: "",
        Rpassword2: "",
    }); 
    const {Rname,Remail,Rpassword,Rpassword2} = formState */
    const onSubmit = data => handleRegister(data);
  const handleRegister = async (data) => {
      const{Rname,Remail,Rpassword,Rpassword2}=data;
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
                    <input type="text" placeholder="Name" {...register("Rname",{
                        required:"Aquest camp és obligatori",
                        minLength:{
                            value: 8,
                            message: "El nom ha de tenir al menys 8 caràcters"
                        },pattern: {

                            value: /^([a-zA-Z@_-]+)\s+([a-zA-Z@_-]+)$/,
                            
                            message:"El nom ha de estar format per dues paraules que poden contenir (@,-,_)"}
                        
                    })}></input>

                    <label htmlFor="username">Email</label>
                    <input type="text" placeholder="Email addres" {...register("Remail",{
                        required:"Aquest camp és obligatori",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@(insjoaquimmir\.cat|fp\.insjoaquimmir\.cat|gmail\.com)$/i, // Expresión regular para validar el formato del email y el dominio permitido
                            message:"El correu ha de ser dels dominis @insjoaquimmir.cat, @fp.insjoaquimmir.cat o @gmail.com"
                        }
                    })}></input>
    
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" {...register("Rpassword",{
                        required:"Aquest camp és obligatori",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, // Expresión regular para validar la contraseña
                            message:"La contrasenya ha de tenir com a mínim 8 caràcters, una lletra majúscula, una minúscula, un número i un caracter especial"
                        }
                    })}></input>
                    
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="Password" {...register("Rpassword2")}></input>

                    {missatge? <div className='AlertError'>{missatge}</div>:<></>}
                    {errors.Rname && <div className='AlertError' >{errors.Rname.message}</div>}
                    {errors.Remail && <div className='AlertError'>{errors.Remail.message}</div>}
                    {errors.Rpassword && <div className='AlertError'>{errors.Rpassword.message}</div>}
                    <button  className='buttonLoginregisterDif'onClick={handleSubmit(onSubmit)}>
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