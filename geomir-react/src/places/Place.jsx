import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { ReviewsList } from './reviews/ReviewsList';


export const Place = () => {
  const { id } = useParams();
  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
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
  
  const getPlace = async () => {
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
  useEffect(() => { getPlace();}, [refresh]);
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
                <i className="bi bi-star-fill"></i>
                {place.favorites_count}
            </div>
            <div id='optionsPlaceGrid'>
                {(usuari == place.author.email ) &&  
                <Link className="headerLink" to={"/places/edit/" +place.id}><i className="bi bi-pencil-square"></i></Link>}

                {(usuari == place.author.email ) &&
                <button className='deleteButton'
                    onClick={(e) => {
                    deletePlace(e,place.id);
                    }}><i className="bi bi-trash3"></i>
                </button>}
            </div>

            <div><ReviewsList/></div>
      </div>
    </div>
  )
}
