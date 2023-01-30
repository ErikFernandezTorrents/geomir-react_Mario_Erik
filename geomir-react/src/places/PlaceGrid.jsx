import React, { useCallback } from 'react'
import '../App.css'
import { UserContext } from '../userContext'
export const PlaceGrid = ({place}) => {
    console.log(place)
    const {usuari} = useCallback(UserContext)
  return (
    <>
        <div className='containerGrid'>
        <p>@{place.author.name}</p>
        <h2>{place.name}</h2>
            <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="400"width="300"/>
            <div className='InfoPlace'>
                {place.description}     
            </div>
            <div className='divFavorites'>
                <i class="bi bi-star-fill"></i>
                {place.favorites_count}
            </div>
            <div id='optionsPlaceGrid'>
                <i className="bi bi-pencil-square"></i>
                <i className="bi bi-trash3"></i>
            </div>
        </div>
    </>
  )
}
