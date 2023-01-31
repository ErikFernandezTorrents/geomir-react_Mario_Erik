import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';


export const Place = () => {
  const { id } = useParams();
  let [place, setPlaces] = useState({
    author:{name:""},
    name:"",
    description:"",
    latitude:"",
    longitude:"",
    favorites_count:"",
    reviews_count:"",
    file:{filepath:""}
  });
  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)
  const getPlace = async (e) => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
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
  useEffect(() => { getPlace(); }, []);
  return (
    <div>
      <div>
        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="500"width="700"/>
        <h2>{place.name}</h2>
        <p>Autor: @{place.author.name}</p>
        <p>Latitud: {place.latitude}</p>
        <p>Longitud: {place.longitude}</p>
        <div className='InfoPlace'>
            <p>Descripció: </p>
            {place.description}     
        </div>
        <div className='divFavorites'>
                <i class="bi bi-star-fill"></i>
                {place.favorites_count}
            </div>
            <div id='optionsPlaceGrid'>
                {(usuari == place.author.email ) &&  
                <i className="bi bi-pencil-square"></i>}

                {(usuari == place.author.email ) &&
                <i className="bi bi-trash3"></i>}
            </div>
            <p>Hi ha {place.reviews_count} ressenyes</p>
      </div>
    </div>
  )
}
