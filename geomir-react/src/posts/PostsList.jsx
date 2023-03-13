import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../userContext";
import { PostList } from './PostList'
import '../App.css'
import useFetch from '../hooks/useFetch';
export const PostsList = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [missatge, setMissatge] = useState("");

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
        <table id='tablePostList'>
          <tbody>
            <tr id='tr1PostList'>
              <th>Id</th>
              <th>Author</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Comments</th>
              <th>Visibility</th>
              <th>Likes</th>
            </tr>       
            
            {data.map((post) => (
                (post.visibility.name == 'public' || usuari == post.author.email) &&  
                (<tr  key={data.id} id='tr2PostList'><PostList post={post} deletePost={deletePost}/></tr>)
            ))}
          </tbody>
        </table>
        :
        <div>Cargando...</div>
      }

    </>
  )
}