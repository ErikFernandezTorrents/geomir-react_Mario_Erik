
import React, { useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import { PlaceList } from './PlaceList'
import '../App.css'
import { getPlaces } from '../slices/place/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export const PlacesList = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  const dispatch = useDispatch();

  const { places , page = 0, addreview = true, missatge = "", isLoading = true } = useSelector((state) => state.places);

  console.log(places);
  
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPlaces(0, authToken));
  }, []);
  return (
    <>
      {!isLoading ? 
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
                (<tr  key={place.id} id='tr2PlaceList'><PlaceList place={place}/></tr>)
            ))}
          </tbody>
        </table>
      :
        <div>Carregant...</div>
      }
    </>
  )
}
