import React from 'react'
import { Link } from "react-router-dom";
import '../App.css'
export const PlacesMenu = () => {
  return (
    <>
        <div className='PlacesPostMenu'>
            <Link className="MenuLinks" to="/places/add">Añadir Place <i className="bi bi-plus-square"></i></Link>
            <Link className="MenuLinks" to="/places/grid"> Grid <i className="bi bi-grid"></i></Link>
            <Link className="MenuLinks" to="/places/list"> List <i className="bi bi-card-list"></i></Link>
            <Link className="MenuLinks" to="/todos"> Todos</Link>
            <Link className="MenuLinks" to="/places/marks">Markers</Link>
        </div>
    </>
  )
}