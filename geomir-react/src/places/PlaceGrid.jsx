import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'
import { UserContext } from '../userContext'
import { setFiltre } from '../slices/place/placeSlice'
export const PlaceGrid = ({place}) => {
    let { usuari,authToken } = useContext(UserContext)
    const dispatch = useDispatch();
    const { filter} = useSelector((state) => state.places);
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
                {(usuari == place.author.email ) &&  
                <Link className="headerLink" to={"/places/edit/" +place.id}><i className="bi bi-pencil-square"></i></Link>}

                {(usuari == place.author.email ) &&
                <button className='deleteButton'
                    onClick={(e) => {
                    dispatch(deletePlace(place.id,authToken));
                    }}><i className="bi bi-trash3"></i>
                </button>}
                <button className='deleteButton'
                    onClick={(e) => {
                    e.preventDefault();
                    dispatch(setFiltre({...filter,author:place.author.id}));
                    }}><i className="bi bi-filter"></i>
                </button>
                <Link className="headerLink" to={"/places/" +place.id}><i className="bi bi-eye"></i></Link>
            </div>
        </div>
    </>
  )
}
