import React from 'react'

export const PlaceGrid = ({place}) => {
  return (
    <>
        <tr className='containerGrid'>
            <th>
                <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="400"width="300"/>
            </th>
            <th className='thGrid'>
                <div className='InfoPlace'>
                    <h2>{place.name}</h2>
                    {place.description}
                </div>
            </th>
        </tr>
    </>
  )
}
