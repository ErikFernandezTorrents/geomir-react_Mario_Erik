import React, { useContext,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPlaces } from '../slices/place/thunks';
import { UserContext } from "../userContext";
import Paginate from './Paginate';
import { PlaceGrid } from './PlaceGrid'

export const PlacesGrid = () => {
  let { usuari,authToken } = useContext(UserContext)
  const { places , page, isLoading=true } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPlaces(page, authToken));
  }, [page]);
  return (
    <>   
        {!isLoading ? 
          <div className='wrapper'>
            { places.map ( (place)=> (
              
                (place.visibility.name == 'public' || usuari == place.author.email) &&  
                (<PlaceGrid place={place}/>) 
              
            ) ) }
          </div>
          :
          <div>Carregant...</div>
        }
        <Paginate/>
        
    </>
  )
}
