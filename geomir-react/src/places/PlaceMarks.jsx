import React, { useEffect, useReducer } from 'react'
import PlaceMark  from './PlaceMark';
import { useSelector } from 'react-redux';

const PlaceMarks = () => {
    
    const {marks}  = useSelector(state => state.markplaces)

    console.log(marks);
    useEffect ( ()=>{
        localStorage.setItem('marks',JSON.stringify(marks))
    },[marks])

  return (
    <div className='wraper'>
        <h2>Markers</h2>
        {marks.map((mark) => (
            <PlaceMark key={mark.id} mark={mark}/>   
        ))}
    </div>
  )
}

export default PlaceMarks