
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../userContext";
export const Header = () => {
  let { authToken, setAuthToken } = useContext(UserContext)
  let [nameOfUser, setNameOfUser] = useState("")
  let [roles, setRoles] = useState([]);

  const sendLogout = async (authToken) => {
    // Enviam dades a l'aPI i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,

        },
        method: "POST"
      })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success === true) {
        setAuthToken("");
        console.log("Logaout");
      } else {
        setMissatge(resposta.message);
      }
    } catch {
      console.log(data);
      console.log("Xarxa desconectada");
    }
    console.log("Logout okay");
  }
  const sendUser = async () => {
    // Enviam dades a l'aPI i recollim resultat
    try {

      const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET"
      })
      const resposta = await data.json();
      if (resposta.success === true) {
        setNameOfUser(resposta.user.name);
        setRoles(resposta.roles);
        console.log(resposta);
      } else {
        setMissatge(resposta.message);
      }
    } catch {
      console.log(data);
      console.log("Xarxa desconectada");
    }
    console.log("Name okay");
  }


useEffect(() => {

  sendUser();
}, [])

return (
  <>
    <div id='header'>
      <Link to="/about">About </Link>
      <Link to="/places">Places </Link>
      <Link to="/posts">Posts </Link>
      <p>User : {nameOfUser}</p>
      {roles.map((v) => (
        <span key={v}> {v} </span>
      ))}
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