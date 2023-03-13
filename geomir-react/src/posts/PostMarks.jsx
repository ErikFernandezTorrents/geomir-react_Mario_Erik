import React, { useEffect, useReducer } from 'react'
import PostMark  from './PostMark';
import { useSelector } from 'react-redux';

const PostMarks = () => {
    
    const {marks}  = useSelector(state => state.markposts)

    console.log(marks);
    useEffect ( ()=>{
        localStorage.setItem('marks',JSON.stringify(marks))
    },[marks])

  return (
    <div className='wraper'>
        <h2>Markers</h2>
        {marks.map((mark) => (
            <PostMark key={mark.id} mark={mark}/>   
        ))}
    </div>
  )
}

export default PostMarks