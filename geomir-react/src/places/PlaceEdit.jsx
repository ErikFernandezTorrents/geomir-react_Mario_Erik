import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editPlace, getPlace } from '../slices/place/thunks';

export const PlaceEdit = () => {
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let { authToken,setAuthToken } = useContext(UserContext);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let {  place, missatge = "" } = useSelector((state) => state.places);

    const handleChange = (e) => {
      e.preventDefault();
      missatge="";
      if (e.target.name==="upload")
        {
          console.log(e.target.files[0].name)
          setFormulari({
            ...formulari,
            [e.target.name] : e.target.files[0] 
  
  
          })
        }
      else {
            setFormulari({
              ...formulari,
              [e.target.name] : e.target.value
  
            })
        };
    }
    
    useEffect(() => {
      dispatch(getPlace( 0, id, authToken));

    }, []);
    useEffect (()=> {

      setFormulari({
      
      name: place.name,
      
      description: place.description,
      
      longitude: place.longitude,
      
      latitude: place.latitude,
      
      visibility: place.visibility.id
      
      })
      
      },[place]);

  return (
    <div>
        <div className="container">
          <form id="formAddPlace"className="addPlace">
            <div className="title"><h3>Edit your place</h3></div>

            <div>
              <input type="text"placeholder="Name" id="name" name="name" value = { formulari.name } onChange={handleChange}/>
            </div>

            <div>
              <input type="text"placeholder="Description" id="description" name="description" value = { formulari.description } onChange={handleChange}/>
            </div>

            <div>
              <input type="number" placeholder="Latitude" id="latitude" name="latitude" value = { formulari.latitude } onChange={handleChange}/>
            </div>

            <div>
              <input type="number"placeholder="Longitude" id="longitude" name="longitude" value = { formulari.longitude } onChange={handleChange}/>
            </div>

            <div>
              <label>Visibility</label>
              <select value= {formulari.visibility } onChange={handleChange} id="visibility" name="visibility"  >
                <option  value="1" checked >Public</option>
                <option  value="3" >Private</option>
                <option  value="2" >Contacts</option>
              </select>
            </div>

            <div>
              <input type="file" placeholder="Upload" id="upload" name="upload" onChange={handleChange}/>
            </div>
            <div onChange={handleChange}>{missatge? <div className='AlertError'>{missatge}</div>:<></>}</div>
            <button className="addPlaceButton"
              onClick={(e) => {
                e.preventDefault()
                dispatch(editPlace(id,authToken,formulari));
              }}>
              Desa l'edicio
            </button>		

          </form>
        </div>		
    </div>
  )
}