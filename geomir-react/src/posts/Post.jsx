import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { CommentsList } from './comments/CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import { addmark,ismarked } from "../slices/marksPostsSlice";

export const Post = () => {

  const {marks,isMarked} = useSelector(state => state.markposts)

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { id } = useParams();
  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [like,setlike] =useState(false)
  let [post, setPosts] = useState({
    author:{name:""},
    body:"",
    latitude:"",
    longitude:"",
    likes_count:"",
    comments_count:"",
    file:{filepath:""}
  });
  
  const getPost = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
  const test_likes = async () =>{
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "post",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
                  headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + authToken
                  },
                  method: "delete",
              })
          }else{
            setlike(true);
          }
    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }

  const likes = async (e) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "post",
      })
      console.log(data);
      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
            console.log("Like fet correctament");
            setlike(true);
            setPosts({...post, likes_count: post.likes_count+1})
          }else{
            setMissatge(resposta.message);
          }
    }catch {
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
    }
  }

  const unlike = async (e) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "delete",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
            console.log("Like eliminat correctament");
            setlike(false);
            setPosts({...post, likes_count: post.likes_count-1})
          }else{
            setMissatge(resposta.message);
          }
    }catch {
      console.log(data);
      alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
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
  const markPost = () =>{
    console.log(post);

    const AddMark = {
      id: new Date().getTime(),
      postId: post.id,
      name: post.name,
      body: post.body,
      route: pathname,

    }
    dispatch(addmark(AddMark));
    console.log(pathname);
  }

  useEffect ( ()=>{
    dispatch(ismarked(id));
    localStorage.setItem('mark',JSON.stringify(marks))
  },[marks])
  useEffect(() => { getPost(), test_likes()}, [refresh]);
  
  return (
    <>
    <div className='container-ContainerPost'>
      <div className='containerPost'>
          <p>Autor: @{post.author.name}</p>
          <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.body} height="500"width="650"/>
          <p>Latitud: {post.latitude}</p>
          <p>Longitud: {post.longitude}</p>
          <div className='InfoPost'>
              <p>Cos:</p>
          </div>
          <div className='InfoPost'>
            {post.body}  
          </div>
          <div className='divLikes'> 
                  {!like? 
                    <button className='deleteButton'
                    onClick={(e) => {
                      likes(e);
                    }}><i className="bi bi-heart"></i>
                    </button>:
                    <button className='deleteButton'
                    onClick={(e) => {
                      unlike(e);
                    }}><i class="bi bi-heart-fill"></i>
                    </button>
                  }
                  {post.likes_count}
          </div>
          <div>
              { isMarked ? 
              <button className='addReviewButton'
              onClick={(e) => {
                e.preventDefault();
              }}>
                DESAT
              </button>
              :
              <button className='addReviewButton'
              onClick={(e) => {
                e.preventDefault();
                markPost(post);
              }}>
                DESA
              </button>
            }
          </div>
          <div id='optionsPostGrid'>
              {(usuari == post.author.email ) &&  
              <Link className="headerLink" to={"/posts/edit/" +post.id}><i className="bi bi-pencil-square"></i></Link>}

              {(usuari == post.author.email ) &&
              <button className='deleteButton'
                  onClick={(e) => {
                  deletePost(e,post.id);
                  }}><i className="bi bi-trash3"></i>
              </button>}
          </div>
      </div>
      <div className='commentContainer'><CommentsList id={post.id}/></div>
    </div>
    </>
  )
}