import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import '../App.css'
import { useForm } from '../hooks/useForm';
import { setFiltre } from '../slices/place/placeSlice';
import { UserContext } from '../userContext';
export const PlacesMenu = () => {
  const dispatch = useDispatch();
  const { formState, handleChange,OnResetForm } = useForm({
    searchValue: "",
  }); 
  let { idUser } = useContext(UserContext);
  const { filter } = useSelector((state) => state.places);
  const {searchValue} = formState
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
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="searchValue" value = { searchValue } onChange={handleChange}/>
              <button className="btn btn-outline-primary btn-p" type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFiltre({...filter,description:formState.searchValue}));
              }}>Search</button>
              <button className="btn btn-outline-primary btn-p" type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFiltre({...filter,author:idUser}));
              }}>Els meus places</button>
              <button className="btn btn-outline-primary btn-p" type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFiltre({...filter,author:"",description:""}));
              }}>Buida filtres</button>
            </form>
        </div>
      </div>
    </>
  )
}