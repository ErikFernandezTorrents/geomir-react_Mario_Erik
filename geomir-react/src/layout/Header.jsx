
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../userContext";

export const Header = () => {
  let { authToken,setAuthToken } = useContext(UserContext)

  const sendLogout = (authToken) =>{
    // Enviam dades a l'aPI i recollim resultat
    fetch("http://127.0.0.1:8000/api/logout", {
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer '  + authToken,
      },
      method: "POST"
    })
    .then((data) => data.json())
    .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
            setAuthToken("");
            console.log("Logaout");
        }else{
            setMissatge(resposta.message);
        }
    })
    .catch((data) => {
        console.log(data);
        console.log("Xarxa desconectada");
    });
    console.log("Logout okay") ;
  }
  
  return (
    <>
      <div id='header'>
        <Link to="/about">About </Link>
        <Link to="/places">Places </Link>
        <Link to="/posts">Posts </Link>
        <button className='botoLogout'
          onClick={() => {
              sendLogout(authToken);
          }}
          >
          Logout
        </button>
    </div>
    </>
  )
}