import React, { useState } from 'react'

export const PlaceList = ({place}) => {
  let [usuari, setUsuari] = useState("");

  return (
    <>
        <td>{place.id}</td>
        <td>{place.name}</td>
        <td>{place.author.name}</td>
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{place.favorites_count}</td>
        <td>{place.reviews_count}</td>
        <td>{place.visibility.name}</td>
        <td><i className="bi bi-eye"></i></td>
        <td><i className="bi bi-pencil-square"></i></td>
        <td><i className="bi bi-trash3"></i></td>
    </>
  )
}
