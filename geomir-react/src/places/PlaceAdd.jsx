import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { addPlace } from '../slices/place/thunks';
export const PlaceAdd = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  const {  missatge = "", isLoading=true } = useSelector((state) => state.places);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit,formState: { errors },setValue} = useForm();
  const afegir = (data) => {

    const data2 = { ...data, upload: data.upload[0]}
    
    dispatch(addPlace(data2, authToken));

    navigate("/places/list");
    
  }

  useEffect(() => {
    dispatch(addPlace(afegir));
    navigator.geolocation.getCurrentPosition((pos) => {

      setValue('latitude', pos.coords.latitude)

      setValue('longitude', pos.coords.longitude)
    });

  }, [])

  return (
    <div>
      <div className="container">
        <form id="formAddPlace" className="addPlace">
          <div className="title"><h3>Add New Place</h3></div>

          <div>
            <input type="text" placeholder="Name" id="name" {...register("name",{
              required: "El nom es obligatori",
              maxLength:{
                value: 255,
                message: "El nom ha de tenir com a màxim 255 caràcters"
              },
            })} />
            {errors.name && <div className='AlertError'>{errors.name.message}</div>}
          </div>

          <div>
            <input type="text" placeholder="Description" id="description" {...register("description",{
              required: "La descripció es obligatoria",
              maxLength:{
                value: 255,
                message: "La descripció ha de tenir com a màxim 255 caràcters"
              },
            })} />
            {errors.description && <div className='AlertError'>{errors.description.message}</div>}
          </div>

          <div>
            <input type="number" placeholder="Latitude" id="latitude" {...register("latitude",{
              required: "La latitud es obligatoria",
            })}  />
            {errors.latitude && <div className='AlertError'>{errors.latitude.message}</div>}
          </div>

          <div>
            <input type="number" placeholder="Longitude" id="longitude" {...register("longitude",{
              required: "La longitud obligatoria",
            })}/>
            {errors.longitude && <div className='AlertError'>{errors.longitude.message}</div>}
          </div>

          <div>
            <label>Visibility</label>
            <select {...register("visibility",{
              required: "La longitud obligatoria",
            })} id="visibility"  >
              <option value="1" selected >Public</option>
              <option value="3" >Private</option>
              <option value="2" >Contacts</option>
            </select>
            {errors.visibility && <div className='AlertError'>{errors.visibility.message}</div>}
          </div>

          <div>
            <input type="file" placeholder="Upload" id="upload" {...register("upload",{
              required: "La imatge es obligatoria",
            })} />
            {errors.upload && <div className='AlertError'>{errors.upload.message}</div>}
          </div>
          <div>
            {missatge ? <div className='AlertError'>{missatge}</div> : <></>}
          </div>
          <button className="addPlaceButton"
            onClick={handleSubmit(afegir)}>
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}
