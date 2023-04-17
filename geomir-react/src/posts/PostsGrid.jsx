import React, { useContext, useState,useEffect, useCallback } from 'react'
import useFetch from '../hooks/useFetch';
import { UserContext } from "../userContext";
import { PostGrid } from './PostGrid'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../slices/post/thunks";
import Paginate from './Paginate';

export const PostsGrid = () => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  const { posts, post, page, isLoading=true,filter} = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(authToken,page))
  },[page,filter])
  

  return (
    <>
      <Paginate/>

      {!isLoading ?
        <div className='wrapper'>
          { posts.map ( (post)=> ( 
              (post.visibility.name == 'public' || usuari == post.author.email) &&  
              (<PostGrid key={post.id} post={post}/>)
          ) ) }
          
        </div>  
        :
        <div>Cargando...</div>
      }
      
    </>
  )
}