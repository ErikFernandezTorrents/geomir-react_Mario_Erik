import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../userContext";
import { PostList } from './PostList'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../slices/post/thunks";
import { startLoading } from '../slices/post/postSlice';
export const PostsList = () => {
  let { usuari,authToken } = useContext(UserContext)
  const { posts,isLoading=true, error="",filter} = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(authToken))
  },[filter])

  return (
    <>
      {!isLoading ?
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
                (<tr  key={posts.id} id='tr2PostList'><PostList post={post}/></tr>)
            ))}
          </tbody>
        </table>
        :
        <div>Cargando...</div>
      }

    </>
  )
}