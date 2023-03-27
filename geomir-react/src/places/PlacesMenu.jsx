import React from 'react'
import { Link } from "react-router-dom";
import '../App.css'
export const PlacesMenu = () => {
  return (
    <>
    <div className="prueba">
        <div className='PlacesPostMenu navbar'>
            <Link className="MenuLinks" to="/places/add">Añadir Place <i className="bi bi-plus-square"></i></Link>
            <Link className="MenuLinks" to="/places/grid"> Grid <i className="bi bi-grid"></i></Link>
            <Link className="MenuLinks" to="/places/list"> List <i className="bi bi-card-list"></i></Link>
            <Link className="MenuLinks" to="/todos"> Todos</Link>
            <Link className="MenuLinks" to="/places/marks">Markers</Link>
            <form className="form-inline form-serch">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-primary btn-p" type="submit">Search</button>
              <button className="btn btn-outline-primary btn-p" type="submit">Buida filtres</button>
            </form>
        </div>
      </div>
    </>
  )
}