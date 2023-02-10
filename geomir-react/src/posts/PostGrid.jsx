import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { UserContext } from '../userContext'
export const PostGrid = ({post,deletePost}) => {
    console.log(post)
    let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
    console.log("aaaa  " + usuari)
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
                    deletePost(e,post.id);
                    }}><i className="bi bi-trash3"></i>
                </button>}

                <Link className="headerLink" to={"/posts/" +post.id}><i className="bi bi-eye"></i></Link>
            </div>
        </div>
    </>
  )
}