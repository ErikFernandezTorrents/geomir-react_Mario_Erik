import React from 'react'
import { Link } from "react-router-dom";
import '../App.css'
export const PlacesMenu = () => {
  return (
    <>
        <div className='PlacesPostMenu'>
            <Link className="MenuLinks" to="/places/add">Añadir Place <i class="bi bi-plus-square"></i></Link>
            <Link className="MenuLinks" to="/places/grid"> Grid <i class="bi bi-grid"></i></Link>
            <Link className="MenuLinks" to="/places/list"> List <i class="bi bi-card-list"></i></Link>
        </div>
    </>
  )
}