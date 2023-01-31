
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../userContext";
import { PlaceList } from './PlaceList'
import '../App.css'
export const PlacesList = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [places, setPlaces] = useState([]);

  const sendPlacesList = async (e) => {
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
  useEffect(() => { sendPlacesList(); }, []);
  console.log(usuari); 
  return (
    <>
      
      <table id='tablePlaceList'>
        <tbody>
          <tr id='tr1PlaceList'>
            <th>Id</th>
            <th>Name</th>
            <th>Author</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Reviews</th>
            <th>Visibility</th>
            <th>Favorites</th>

          </tr>       
          {places.map((place) => (
              (place.visibility.name == 'public' || usuari == place.author.email) &&  
              (<tr  key={places.id} id='tr2PlaceList'><PlaceList place={place} /></tr>)
          ))}
        </tbody>
      </table>

    </>
  )
}
