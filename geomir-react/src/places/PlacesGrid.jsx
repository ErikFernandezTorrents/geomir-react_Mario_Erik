import React, { useContext, useState,useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getPlaces } from '../slices/place/thunks';
import { UserContext } from "../userContext";
import { PlaceGrid } from './PlaceGrid'

export const PlacesGrid = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  const { places , page = 0, addreview = true, missatge = "", isLoading=true } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPlaces(0, authToken));
  }, []);
  return (
    <>   
        {!isLoading ? 
          <div className='wrapper'>
            { places.map ( (place)=> (
              
                (place.visibility.name == 'public' || usuari == place.author.email) &&  
                (<PlaceGrid place={place} />) 
              
            ) ) }
          </div>  
          :
          <div>Carregant...</div>
        }
        
    </>
  )
}
