import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { ReviewsList } from './reviews/ReviewsList';
import { useDispatch, useSelector } from 'react-redux';
import { addmark,ismarked } from "../slices/marksPlacesSlice";
import { setMissatge, setPlace } from '../slices/place/placeSlice';
import { deletePlace, getPlace } from '../slices/place/thunks';


export const Place = () => {
  const {marks,isMarked} = useSelector(state => state.markplaces)

  const dispatch = useDispatch();

  const { places, place , page = 0, addreview = true, missatge = "", isLoading=true } = useSelector((state) => state.places);

  console.log(place);
  
  const { pathname } = useLocation();
  
  const { id } = useParams();

  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)

  let [refresh,setRefresh] = useState(false)

  let [favourite,setFavourite] = useState(false)
  
  const test_favourite = async () =>{
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites", {
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
          console.log("He dado favorite de prueva por que no hay ninguno");
          const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites", {
              headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + authToken
              },
              method: "DELETE",
          })
      }else {
        setFavourite(true);
      }
    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }
  const favPlace = async (e) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites", {
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
          //setRefresh(!refresh);
          setFavourite(true);
          setPlace({...place, favorites_count: place.favorites_count+1 })
      }
      
    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }
  const deleteFav = async (e) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites", {
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
          //setRefresh(!refresh);
          setFavourite(false);
          setPlace({...place, favorites_count: place.favorites_count-1 })

      }
      
    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }
  const markPlace = () =>{
    console.log(place);

    const AddMark = {
      id: new Date().getTime(),
      placeId: place.id,
      name: place.name,
      description: place.description,
      route: pathname,

    }
    dispatch(addmark(AddMark));
    console.log(pathname);
  }

  useEffect ( ()=>{
    dispatch(getPlace(0, id, authToken)); 
   
  },[])
  
  useEffect(() => { test_favourite(); deleteFav(); favPlace();}, [refresh]);
  
  useEffect ( ()=>{
    dispatch(ismarked(id));
    localStorage.setItem('mark',JSON.stringify(marks))
  },[marks])
  
  return (
    <>
    { !isLoading?
    <div className='container-ContainerPlace'>
      <div className='containerPlace'>
          <h2>{place.name}</h2>
          <p>Autor: @{place.author.name}</p>
          <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="500"width="700"/>
          <p>Latitud: {place.latitude}</p>
          <p>Longitud: {place.longitude}</p>
          <div className='InfoPlace'>
              <p>Descripció:</p>
          </div>
          <div className='InfoPlace'>
            {place.description}  
          </div>
          <div className='divFavorites'> 
                  {!favourite? 
                    <button className='deleteButton'
                    onClick={(e) => {
                      favPlace(e);
                    }}><i className="bi bi-star"></i>
                    </button>:
                    <button className='deleteButton'
                    onClick={(e) => {
                      deleteFav(e);
                    }}><i className="bi bi-star-fill"></i>
                    </button>
                  }
                  {place.favorites_count}
                  <div>{missatge? <div className='AlertError'>{missatge}</div>:<></>}</div>
          </div>
          <div>
              { isMarked ? 
              <button className='addReviewButton'
              onClick={(e) => {
                e.preventDefault();
              }}>
                DESAT
              </button>
              :
              <button className='addReviewButton'
              onClick={(e) => {
                e.preventDefault();
                markPlace(place);
              }}>
                DESA 
              </button>
            }
          </div>
          <div id='optionsPlaceGrid'>
              {(usuari == place.author.email ) &&  
              <Link className="headerLink" to={"/places/edit/" +place.id}><i className="bi bi-pencil-square"></i></Link>}

              {(usuari == place.author.email ) &&
              <button className='deleteButton'
                  onClick={(e) => {
                  dispatch(deletePlace(place.id,authToken));
                  }}><i className="bi bi-trash3"></i>
              </button>}
          </div>
      </div>
      { !isLoading ? (<div className='reviewContainer'><ReviewsList id={place.id}/></div>)
      : (<></>) }
      
    </div>
    : <p>Loading...</p>}
    </>
  )
}
