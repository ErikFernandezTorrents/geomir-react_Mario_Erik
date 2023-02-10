import React, { useContext, useState,useEffect, useCallback } from 'react'
import { UserContext } from "../userContext";
import { PostGrid } from './PostGrid'

export const PostsGrid = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [posts, setPosts] = useState([]);
  let [refresh,setRefresh] = useState(false)
  
  const sendPostsGrid = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setPosts(resposta.data)
              console.log(resposta);
          }else{
              setMissatge(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa");
    }
  }
  const deletePost = async (e,id) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "DELETE",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setRefresh(!refresh);
              console.log("Post eliminat correctament");
          }else{
              setMissatge(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }
  useEffect(() => { 
    sendPostsGrid(); 
     }
  , [refresh]);
  return (
    <>
        <div className='wrapper'>
          { posts.map ( (post)=> ( 
              (post.visibility.name == 'public' || usuari == post.author.email) &&  
              (<PostGrid post={post} deletePost={deletePost} />)
          ) ) }
          
        </div>  
    </>
  )
}