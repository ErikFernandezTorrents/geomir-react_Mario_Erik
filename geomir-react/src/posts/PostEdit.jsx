import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from "../slices/post/thunks";
import { editPost } from "../slices/post/thunks";

export const PostEdit = () => {
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let { authToken,setAuthToken } = useContext(UserContext);
    let [missatge, setMissatge] = useState("");
    let [missatgeOK, setMissatgeOK] = useState("");
    let [Posts, setPosts] = useState("");
    let navigate = useNavigate();

    let { posts = [], post = {}, page=0, isLoading=true, add=true, error=""} = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const handleChange = (e) => {
      e.preventDefault();
      error=""
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
    useEffect(() => {
      dispatch(getPost(0,id, authToken))
    },[])
  return (
    <div>
        <div className="container">
          <form id="formAddPost"className="addPost">
            <div className="title"><h3>Edit your post</h3></div>

            <div>
              <input type="text"placeholder="Body" id="body" name="body" value = { post.body } onChange={handleChange}/>
            </div>

            <div>
              <input type="number" placeholder="Latitude" id="latitude" name="latitude" value = { post.latitude } onChange={handleChange}/>
            </div>

            <div>
              <input type="number"placeholder="Longitude" id="longitude" name="longitude" value = { post.longitude } onChange={handleChange}/>
            </div>

            <div>
              <label>Visibility</label>
              <select value= {post.visibility } onChange={handleChange} id="visibility" name="visibility"  >
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
                e.preventDefault();
                dispatch(editPost(formulari, authToken, id));
                formAddPost.reset(); 
              }}>
              Desa l'edicio
            </button>		

          </form>
        </div>		
    </div>
  )
}