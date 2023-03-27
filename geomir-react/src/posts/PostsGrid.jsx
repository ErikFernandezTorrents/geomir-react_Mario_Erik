import React, { useContext, useState,useEffect, useCallback } from 'react'
import useFetch from '../hooks/useFetch';
import { UserContext } from "../userContext";
import { PostGrid } from './PostGrid'

export const PostsGrid = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)

  let {data,error,loading,reRender} = useFetch("https://backend.insjoaquimmir.cat/api/posts",
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
      },
      method: "GET",
  })

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
              reRender();
              console.log("Post eliminat correctament");
          }else{
              setMissatge(error);
          }

    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }

  return (
    <>
      {!loading ?
        <div className='wrapper'>
          { data.map ( (post)=> ( 
              (post.visibility.name == 'public' || usuari == post.author.email) &&  
              (<PostGrid post={post} deletePost={deletePost} />)
          ) ) }
          
        </div>  
        :
        <div>Cargando...</div>
      }
    </>
  )
}