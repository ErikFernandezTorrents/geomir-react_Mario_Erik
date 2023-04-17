import React, { useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'
import { UserContext } from '../userContext'
import { deletePost } from "../slices/post/thunks";
import { setFilter } from '../slices/post/postSlice'
export const PostGrid = ({post}) => {
    let { usuari,authToken } = useContext(UserContext)
    const dispatch = useDispatch();
    const { filter} = useSelector((state) => state.post);
  return (
    <>
        <div className='containerGrid'>
        <p>@{post.author.name}</p>
            <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.body} height="400"width="300"/>
            <div className='InfoPost'>
                {post.body}     
            </div>
            <div className='divLikes'>
                <i class="bi bi-heart-fill"></i>
                {post.likes_count}
            </div>
            <div id='optionsPostGrid'>
                {(usuari == post.author.email ) &&  
                <Link className="headerLink" to={"/posts/edit/" +post.id}><i className="bi bi-pencil-square"></i></Link>}

                {(usuari == post.author.email ) &&
                <button className='deleteButton'
                    onClick={(e) => {
                    e.preventDefault();
                    dispatch(deletePost(post.id, authToken));
                    }}><i className="bi bi-trash3"></i>
                </button>}

                <button className='deleteButton'
                    onClick={(e) => {
                    e.preventDefault();
                    dispatch(setFilter({...filter,author:post.author.id}));
                    }}><i className="bi bi-filter"></i>
                </button>

                <Link className="headerLink" to={"/posts/" +post.id}><i className="bi bi-eye"></i></Link>
            </div>
        </div>
    </>
  )
}