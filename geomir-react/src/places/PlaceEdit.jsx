import React from 'react'
import { useParams } from "react-router-dom";

export const PlaceEdit = () => {
    const { id } = useParams();

  return (
    <div>PlaceEdit {id}</div>
  )
}