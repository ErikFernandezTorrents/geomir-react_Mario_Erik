import React, { useContext, useState,useEffect } from 'react'
import { UserContext } from "../userContext";
import { PlaceGrid } from './PlaceGrid'

export const PlacesGrid = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [places, setPlaces] = useState([]);

  const sendPlacesGrid = async (e) => {
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
  useEffect(() => { sendPlacesGrid(); }, []);
  return (
    <>
        <div className='wrapper'>
          { places.map ( (place)=> ( 
              <PlaceGrid place={place} />
          ) ) }
        </div>  
    </>
  )
}
