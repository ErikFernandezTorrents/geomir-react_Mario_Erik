import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { addPost } from "../slices/post/thunks";

export const PostAdd = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const afegir = (data) => {

    const data2 = { ...data, upload: data.upload[0] }

    dispatch(addPost(data2, authToken));

    navigate("/posts/list")

  }

  useEffect(() => {
    dispatch(addPost(afegir));
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue('latitude', pos.coords.latitude)
      setValue('longitude', pos.coords.longitude)
    });

  }, [])

  return (
    <div>
      <div className="container">
        <form id="formAddPost" className="addPost">
          <div className="title"><h3>Add New Post</h3></div>

          <div>
            <input type="text" placeholder="Body" {...register("body", {
              required: "El cos es obligatori",
              maxLength: {
                value: 255,
                message: "El cos ha de tenir com a màxim 255 caràcters"
              },
            })} />
            {errors.body && <div className='AlertError'>{errors.body.message}</div>}
          </div>

          <div>
            <input type="number" placeholder="Latitude" {...register("latitude", {
              required: "La latitud es obligatoria",
            })} />
            {errors.latitude && <div className='AlertError'>{errors.latitude.message}</div>}
          </div>

          <div>
            <input type="number" placeholder="Longitude"{...register("longitude", {
              required: "La longitud obligatoria",
            })} />
            {errors.longitude && <div className='AlertError'>{errors.longitude.message}</div>}
          </div>

          <div>
            <label>Visibility</label>
            <select {...register("visibility", {
              required: "La longitud obligatoria",
            })} id="visibility"  >
              <option value="1" selected >Public</option>
              <option value="3" >Private</option>
              <option value="2" >Contacts</option>
            </select>
            {errors.visibility && <div className='AlertError'>{errors.visibility.message}</div>}
          </div>

          <div>
            <input type="file" placeholder="Upload" {...register("upload", {
              required: "La imatge es obligatoria",
            })} />
            {errors.upload && <div className='AlertError'>{errors.upload.message}</div>}
          </div>

          <button className="addPostButton"
            onClick={handleSubmit(afegir)}>
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}