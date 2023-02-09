import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { ReviewsList } from './reviews/ReviewsList';


export const Place = () => {
  const { id } = useParams();
  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [favourite,setFavourite] = useState(false)
  let [emoticono,setEmoticono] = useState(false)
  let [missatge, setMissatge] = useState("");
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
  const test_favourite = async (e) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "POST",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setRefresh(!refresh);
              setFavourite(true);
              console.log("He dado favorite de prueva por que no hay ninguno");
              if (favourite==true){
                try{
                  const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
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
                          setFavourite(false);
                          setEmoticono(true);
                          console.log("Quito el fav de prueva");
                      }else{
                          setMissatge(resposta.message);
                      }
            
                }catch {
                  console.log(data);
                  alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
                }
              }
              
          }else {
            if (emoticono==true){
              const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                    },
                    method: "POST",})
              const resposta = await data.json();
              console.log(resposta);
              if (resposta.success === true) {
                  setFavourite(true);
                  setEmoticono(false);
                  console.log("Doy fav");
              }
          }else{
            setMissatge(resposta.message);
            setEmoticono(false);
          }
        }
    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
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
  useEffect(() => { getPlace(); test_favourite();}, [refresh]);
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
                <button className='deleteButton'
                    onClick={(e) => {
                      test_favourite(e);
                    }}><i className="bi bi-star-fill"></i>
                    {emoticono? <i className="bi bi-plus-square-fill"></i>:<i className="bi bi-dash-square-fill"></i> }
                </button>
                {place.favorites_count}
                <div>{missatge? <div className='AlertError'>{missatge}</div>:<></>}</div>
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

            <div><ReviewsList id={place.id}/></div>
      </div>
    </div>
  )
}
