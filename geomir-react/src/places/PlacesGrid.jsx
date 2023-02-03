import React, { useContext, useState,useEffect, useCallback } from 'react'
import { UserContext } from "../userContext";
import { PlaceGrid } from './PlaceGrid'

export const PlacesGrid = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [places, setPlaces] = useState([]);
  let [refresh,setRefresh] = useState(false)
  
  const sendPlacesGrid = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setPlaces(resposta.data)
              console.log(resposta);
          }else{
              setMissatge(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa");
    }
  }
  const deletePlace = async (e,id) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "DELETE",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setRefresh(!refresh);
              console.log("Place eliminat correctament");
          }else{
              setMissatge(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }
  useEffect(() => { 
    sendPlacesGrid(); 
     }
  , [refresh]);
  return (
    <>
        <div className='wrapper'>
          { places.map ( (place)=> ( 
              (place.visibility.name == 'public' || usuari == place.author.email) &&  
              (<PlaceGrid place={place} deletePlace={deletePlace} />)
          ) ) }
          
        </div>  
    </>
  )
}
