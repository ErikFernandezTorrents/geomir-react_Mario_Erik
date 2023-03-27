import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import { useDispatch } from 'react-redux';
import { delmark } from "../slices/marksPlacesSlice";

const PlaceMark = ({mark}) => {

    const dispatch = useDispatch();
    console.log(mark.description);
  return (
    <>
        
        <div class="card background-card" >
            <div class="card-body">
                <h2>{mark.name}</h2>
                <div className='InfoPlace'>
                    {mark.description}     
                </div>
                <div id='optionsPlaceGrid'>
                    <button className='deleteButton'
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(delmark(mark.id));
                        }}><i className="bi bi-trash3"></i>
                    </button>

                    <Link className="headerLink" to={mark.route}><i className="bi bi-eye"></i></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default PlaceMark