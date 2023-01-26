import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';


export const Place = () => {
  const { id } = useParams();
  
  return (
    <div>Place {id}</div>
  )
}
