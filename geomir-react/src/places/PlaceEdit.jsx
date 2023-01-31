import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useParams } from "react-router-dom";

export const PlaceEdit = () => {
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let { authToken,setAuthToken } = useContext(UserContext);
    let [missatge, setMissatge] = useState("");
    let [missatgeOK, setMissatgeOK] = useState("");
    let [places, setPlaces] = useState("");

    const handleChange = (e) => {
      e.preventDefault();
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
    const getPlaceForEdit = async() =>{
      
      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          method: "GET"

        })
        const resposta = await data.json();
        if (resposta.success === true){
          const { data } = resposta
          setFormulari({
            ...formulari,
            "name":data.name,
            "description":data.description,
            "upload":"",
            "latitude":data.latitude,
            "longitude":data.longitude,
            "visibility":data.visibility,

          })
        } 

        else{
          console.log(formulari)
          setMissatge(resposta.message);
        } 
          
      }catch{
        console.log("Error");
        alert("catch");
      }
      formAddPlace.reset(); 
    }
    const editPlace = async(e) => {
      e.preventDefault();
      let {name,description,upload,latitude,longitude,visibility}=formulari;
      console.log(formulari);
      var formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);

      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/edit" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          method: "POST",
          body: formData

        })
        const resposta = await data.json();
        if (resposta.success === true){
          console.log(resposta);
          setMissatgeOK("Place editat amb exit!!");
        } 

        else{
          console.log(formulari)
          setMissatge(resposta.message);
        } 
          
      }catch{
        console.log("Error");
        alert("catch");
      }
      formAddPlace.reset(); 
    }
    useEffect(() => {
      editPlace();
      getPlaceForEdit();
      navigator.geolocation.getCurrentPosition( (pos )=> {

        setFormulari({
    
    
          ...formulari,
          latitude :  pos.coords.latitude,
          longitude: pos.coords.longitude
      
        })
        
        console.log("Latitude is :", pos.coords.latitude);
        console.log("Longitude is :", pos.coords.longitude);
      });

    }, [])
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
            <div>{missatge? <div className='AlertError'>{missatge}</div>:<></>}</div>
            <div>{missatgeOK? <div className='AlertOk'>{missatgeOK}</div>:<></>}</div>
            <button className="addPlaceButton"
              onClick={(e) => {
                editPlace(e);
              }}>
              Desa l'edicio
            </button>		

          </form>
        </div>		
    </div>
  )
}