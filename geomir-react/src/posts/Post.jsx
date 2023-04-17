import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { CommentsList } from './comments/CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import { addmark,ismarked } from "../slices/marksPostsSlice";
import { getPost } from "../slices/post/thunks";
import { deletePost } from "../slices/post/thunks";
import { setPosts } from '../slices/post/postSlice';
import { test_likes } from "../slices/post/thunks";
import { likes } from "../slices/post/thunks";
import { unlike } from "../slices/post/thunks";

export const Post = () => {

  const { post , missatge = "", isLoading=true,like } = useSelector((state) => state.post);  const {marks,isMarked} = useSelector(state => state.markposts)
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const { id } = useParams();
  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)  
  
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
  useEffect(() => {
    dispatch(getPost(id, authToken))
  },[])
  
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
                      dispatch(likes(id,authToken,post))
                    }}><i className="bi bi-heart"></i>
                    </button>:
                    <button className='deleteButton'
                    onClick={(e) => {
                      dispatch(unlike(id,authToken,post))
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
                  e.preventDefault();
                  dispatch(deletePost(post.id, authToken,0,id));
                  navigate("/posts/list");
                  }}><i className="bi bi-trash3"></i>
              </button>}
          </div>
      </div>
      {!isLoading ?(<div className='commentContainer'><CommentsList id={post.id}/></div>):(<></>)}
    </div>
    </>
  )
}