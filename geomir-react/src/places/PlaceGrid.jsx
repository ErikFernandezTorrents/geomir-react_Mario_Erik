import React from 'react'

export const PlaceGrid = ({place}) => {
    console.log(place)
  return (
    <>
        <div className='containerGrid'>
        <h2>{place.name}</h2>
            <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="400"width="300"/>
            <div className='InfoPlace'>
                {place.description}     
            </div>
            <div className='divFavorites'>
                <i class="bi bi-star"></i>
                {place.favorites_count}
            </div>
        </div>
    </>
  )
}
