import React, { useCallback, useContext, useState} from 'react'
import '../App.css'
import { Place } from './Place'
import { UserContext } from '../userContext'
import { Link } from 'react-router-dom'
export const PlaceList = ({place}) => {
let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)

  return (
    <>
        <td>{place.id}</td>
        <td>{place.name}</td>
        <td>{place.author.name}</td>
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{place.reviews_count}</td>
        <td>{place.visibility.name}</td>
        <td><i className="bi bi-star-fill"></i>{place.favorites_count}</td>
        <td><Link className="headerLink" to={"/places/" +place.id}><i className="bi bi-eye"></i></Link></td>
        
        {(usuari == place.author.email ) &&  
        <td><Link className="headerLink" to={"/places/edit/" +place.id}><i className="bi bi-pencil-square"></i></Link></td>}

         {(usuari == place.author.email ) ?  
        <td><i className="bi bi-trash3"></i></td> : <td/>}
    </>
  )
}
