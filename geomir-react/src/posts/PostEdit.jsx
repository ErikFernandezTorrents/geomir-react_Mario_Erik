import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate, useParams } from "react-router-dom";

export const PostEdit = () => {
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let { authToken,setAuthToken } = useContext(UserContext);
    let [missatge, setMissatge] = useState("");
    let [missatgeOK, setMissatgeOK] = useState("");
    let [Posts, setPosts] = useState("");
    let navigate = useNavigate();

    const handleChange = (e) => {
      e.preventDefault();
      setMissatge("");
      setMissatgeOK("");
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
    const getPostForEdit = async() =>{
      
      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
            name: data.name,
            description: data.description,
            upload: "",
            latitude: data.latitude,
            longitude: data.longitude,
            visibility: data.visibility.id,

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
      formAddPost.reset(); 
    }
    const editPost = async(e) => {

      e.preventDefault();

      let {name,description,upload,latitude,longitude,visibility}=formulari;
      console.log(formulari);
      var formData = new FormData();
      formData.append("body", body);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);

      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
          setMissatgeOK("Post editat amb exit!!");
        } 

        else{
          console.log(formulari)
          setMissatge(resposta.message);
        } 
          
      }catch{
        console.log("Error");
        alert("catch");
      }
      formAddPost.reset(); 
      navigate("/posts/list")
    }
    useEffect(() => {
      editPost();
      getPostForEdit();
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
          <form id="formAddPost"className="addPost">
            <div className="title"><h3>Edit your post</h3></div>

            <div>
              <input type="text"placeholder="Body" id="body" name="body" value = { formulari.body } onChange={handleChange}/>
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
            <div onChange={handleChange}>{missatgeOK? <div className='AlertOk'>{missatgeOK}</div>:<></>}</div>
            <button className="addPostButton"
              onClick={(e) => {
                editPost(e);
              }}>
              Desa l'edicio
            </button>		

          </form>
        </div>		
    </div>
  )
}