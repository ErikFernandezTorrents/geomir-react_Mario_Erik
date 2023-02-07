import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate } from 'react-router-dom';
export const PlaceAdd = () => {
  let [formulari, setFormulari] = useState({});
  let { authToken,setAuthToken } = useContext(UserContext);
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let navigate = useNavigate();

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
    const addPlace = async(e) => {
      e.preventDefault();
      let {name,description,upload,latitude,longitude,visibility=1}=formulari;
      console.log(formulari);
      var formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);

      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
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
          setMissatgeOK("Place creat amb exit!!");
        } 

        else{
          console.log(formulari)
          setMissatge(resposta.message);
        } 
          
      }catch{
        console.log("Error");
      }
      formAddPlace.reset(); 
      
    }
    useEffect(() => {
      addPlace();
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
            <div className="title"><h3>Add New Place</h3></div>

            <div>
              <input type="text"placeholder="Name" id="name" name="name" onChange={handleChange}/>
            </div>

            <div>
              <input type="text"placeholder="Description" id="description" name="description" onChange={handleChange}/>
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
                <option  value="1" selected >Public</option>
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
                addPlace(e);
              }}>
              Submit
            </button>		

          </form>
        </div>		
    </div>
  )
}
