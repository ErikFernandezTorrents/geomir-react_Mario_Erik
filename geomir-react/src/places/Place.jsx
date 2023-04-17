import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { ReviewsList } from './reviews/ReviewsList';
import { useDispatch, useSelector } from 'react-redux';
import { addmark,ismarked } from "../slices/marksPlacesSlice";
import { deleteFav, deletePlace, favPlace, getPlace, test_favourite } from '../slices/place/thunks';


export const Place = () => {
  const {marks,isMarked} = useSelector(state => state.markplaces)

  const dispatch = useDispatch();

  const { place , missatge = "", isLoading=true,favourite } = useSelector((state) => state.places);

  
  const { pathname } = useLocation();

  let navigate = useNavigate();

  const { id } = useParams();

  let {usuari,authToken } = useContext(UserContext)

  const markPlace = () =>{
    console.log(place);

    const AddMark = {
      id: new Date().getTime(),
      placeId: place.id,
      name: place.name,
      description: place.description,
      route: pathname,

    }
    dispatch(addmark(AddMark));
    console.log(pathname);
  }

  useEffect ( ()=>{
    dispatch(getPlace( id, authToken)); 
   
  },[])
  
  useEffect ( ()=>{
    dispatch(ismarked(id));
    localStorage.setItem('mark',JSON.stringify(marks))
  },[marks])
  
  return (
    <>
    { !isLoading?
    <div className='container-ContainerPlace'>
      <div className='containerPlace'>
          <h2>{place.name}</h2>
          <p>Autor: @{place.author.name}</p>
          <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="500"width="700"/>
          <p>Latitud: {place.latitude}</p>
          <p>Longitud: {place.longitude}</p>
          <div className='InfoPlace'>
              <p>Descripció:</p>
          </div>
          <div className='InfoPlace'>
            {place.description}  
          </div>
          <div className='divFavorites'> 
                  {!favourite? 
                    <button className='deleteButton'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(favPlace(id,authToken,place));
                    }}><i className="bi bi-star"></i>
                    </button>:
                    <button className='deleteButton'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteFav(id,authToken,place));
                    }}><i className="bi bi-star-fill"></i>
                    </button>
                  }
                  {place.favorites_count}
                  <div>{missatge? <div className='AlertError'>{missatge}</div>:<></>}</div>
          </div>
          <div>
              { isMarked ? 
              <button className='addReviewButton'
              onClick={(e) => {
                e.preventDefault();
              }}>
                DESAT
              </button>
              :
              <button className='addReviewButton'
              onClick={(e) => {
                e.preventDefault();
                markPlace(place);
              }}>
                DESA 
              </button>
            }
          </div>
          <div id='optionsPlaceGrid'>
              {(usuari == place.author.email ) &&  
              <Link className="headerLink" to={"/places/edit/" +place.id}><i className="bi bi-pencil-square"></i></Link>}

              {(usuari == place.author.email ) &&
              <button className='deleteButton'
                  onClick={(e) => {
                    e.preventDefault();
                  dispatch(deletePlace(place.id,authToken));
                  navigate("/places/list");
                  }}><i className="bi bi-trash3"></i>
              </button>}
          </div>
      </div>
      { !isLoading ? (<div className='reviewContainer'><ReviewsList id={place.id}/></div>)
      : (<></>) }
      
    </div>
    : <p>Loading...</p>}
    </>
  )
}
