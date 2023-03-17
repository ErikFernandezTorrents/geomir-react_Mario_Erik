import React, { useContext, useEffect } from 'react';
import { UserContext } from "../../userContext";
import '../../App.css'
import { Review } from './Review';
import { ReviewAdd } from './ReviewAdd';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../slices/reviews/thunks';

export const ReviewsList = ({ id }) => {
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext)
  // let [reviews, setReview] = useState([]);
  // let [refresh,setRefresh] = useState(false)
  // let [missatge, setMissatge] = useState("");
  // let [addreview, setAddreview] = useState(true);
  const dispatch = useDispatch();
  const { reviews = [], page = 0, addreview = true, missatge = "" } =
    useSelector((state) => state.reviews);

  useEffect(() => {
    // dispatch(setReviewsCount(reviews_count))
    dispatch(getReviews(0, id, authToken, usuari));
  }, []);
  
  // creo funcion para pasar refresh como prop a los componentes hijos
  // const canviRefresh = () => {
  //   setRefresh(!refresh);
  // }
  return (
    <>
      {reviews.map((review) => (
        <div key={reviews.id} >
          {(usuari == review.user.email && addreview == true)}
          <Review review={review}/>
        </div>
      ))}
      {addreview == true && <ReviewAdd/>}
    </>
  )
}