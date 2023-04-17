import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../userContext';
import { setFilter } from '../slices/post/postSlice';
import { useForm } from '../hooks/useForm';
export const PostsMenu = () => {
  const dispatch = useDispatch();
  const { formState, handleChange,OnResetForm } = useForm({
    searchValue: "",
  }); 
  let { idUser } = useContext(UserContext);
  const { filter } = useSelector((state) => state.post);
  const {searchValue} = formState
  return (
    <>
        <div className='PlacesPostMenu navbar'>
            <Link className="MenuLinks" to="/posts/add">Añadir Post <i className="bi bi-plus-square"></i></Link>
            <Link className="MenuLinks" to="/posts/grid"> Grid <i className="bi bi-grid"></i></Link>
            <Link className="MenuLinks" to="/posts/list"> List <i className="bi bi-card-list"></i></Link>
            <Link className="MenuLinks" to="/todos"> Todos</Link>
            <Link className="MenuLinks" to="/posts/marks">Markers</Link>
            <form className="form-inline form-serch">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="searchValue" value = { searchValue } onChange={handleChange}/>
              <button className="btn btn-outline-primary btn-p" type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({...filter,body:formState.searchValue}));
              }}>Search</button>
              <button className="btn btn-outline-primary btn-p" type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log({...filter,author:idUser})
                dispatch(setFilter({...filter,author:idUser}));
              }}>Els meus posts</button>
              <button className="btn btn-outline-primary btn-p" type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({...filter,author:"",body:""}));
              }}>Buida filtres</button>
            </form>
        </div>
    </>
  )
}