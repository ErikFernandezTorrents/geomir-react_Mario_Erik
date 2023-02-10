import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../userContext";
import { PostList } from './PostList'
import '../App.css'
export const PostsList = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [posts, setPosts] = useState([]);
  let [refresh,setRefresh] = useState(false)
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  const sendPostsList = async (e) => {
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
    sendPostsList();
    //deletePost();
  }, [refresh]);
  console.log(usuari); 
  return (
    <>
      
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
          {posts.map((post) => (
              (post.visibility.name == 'public' || usuari == post.author.email) &&  
              (<tr  key={posts.id} id='tr2PostList'><PostList post={post} deletePost={deletePost}/></tr>)
          ))}
        </tbody>
      </table>

    </>
  )
}