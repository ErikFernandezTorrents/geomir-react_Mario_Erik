import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import { useDispatch } from 'react-redux';
import { delmark } from "../slices/marksPostsSlice";

const PostMark = ({mark}) => {

    const dispatch = useDispatch();
    console.log(mark.description);
  return (
    <>
        <div className='containerGrid'>
            <div className='InfoPost'>
                {mark.body}     
            </div>
            <div id='optionsPostGrid'>
                <button className='deleteButton'
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(delmark(mark.id));
                    }}><i className="bi bi-trash3"></i>
                </button>

                <Link className="headerLink" to={mark.route}><i className="bi bi-eye"></i></Link>
            </div>
        </div>
    </>
  )
}

export default PostMark