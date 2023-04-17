import React, { useCallback, useContext, useState} from 'react'
import '../App.css'
import { UserContext } from '../userContext'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from "../slices/post/thunks";
import { setFilter } from '../slices/post/postSlice'
export const PostList = ({post}) => {
  let { usuari,authToken } = useContext(UserContext)
  const dispatch = useDispatch();
  const { isLoading = true ,filter} = useSelector((state) => state.post);
  return (
    <>
    { !isLoading?
    <>
        <td>{post.id}</td>
        <td>{post.author.name}</td>
        <td>{post.latitude}</td>
        <td>{post.longitude}</td>
        <td>{post.comments_count}</td>
        <td>{post.visibility.name}</td>
        <td><i className="bi bi-heart-fill"></i>{post.likes_count}</td>
        <td><Link className="headerLink" to={"/posts/" +post.id}><i className="bi bi-eye"></i></Link></td>
        
        {(usuari == post.author.email ) &&  
        <td><Link className="headerLink" to={"/posts/edit/" +post.id}><i className="bi bi-pencil-square"></i></Link></td>}

         {(usuari == post.author.email ) && 
            <td>
              <button className='deleteButton'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deletePost(post.id, authToken));
                }}><i className="bi bi-trash3"></i>
              </button>
            </td>
          }
    </>
    : <></>}
    <button className='deleteButton'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setFilter({...filter,author:post.author.id}));
                }}><i className="bi bi-filter"></i>
          </button>
    </>
  )
}