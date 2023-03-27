import React from 'react'
import { Link } from "react-router-dom";
import '../App.css'
export const PostsMenu = () => {
  return (
    <>
        <div className='PlacesPostMenu'>
            <Link className="MenuLinks" to="/posts/add">Añadir Post <i className="bi bi-plus-square"></i></Link>
            <Link className="MenuLinks" to="/posts/grid"> Grid <i className="bi bi-grid"></i></Link>
            <Link className="MenuLinks" to="/posts/list"> List <i className="bi bi-card-list"></i></Link>
            <Link className="MenuLinks" to="/todos"> Todos</Link>
            <Link className="MenuLinks" to="/posts/marks">Markers</Link>
        </div>
    </>
  )
}