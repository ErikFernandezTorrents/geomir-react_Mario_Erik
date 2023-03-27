import React, { useCallback, useContext, useState} from 'react'
import '../App.css'
import { UserContext } from '../userContext'
import { Link } from 'react-router-dom'
export const PostList = ({post,deletePost}) => {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  return (
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
                  deletePost(e,post.id);
                }}><i className="bi bi-trash3"></i>
              </button>
            </td>
          }
    </>
  )
}