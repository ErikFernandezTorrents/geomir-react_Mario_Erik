import React, { useContext, useEffect } from 'react'
import { UserContext } from "../../userContext";
import '../../App.css'
import { useForm } from '../../hooks/useForm';
import { addReview } from '../../slices/reviews/thunks';
import { setAddreview } from '../../slices/reviews/reviewSlice';
import { useDispatch } from 'react-redux';

export const ReviewAdd = ({id}) => {
  let { authToken,setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { formState, handleChange,OnResetForm } = useForm({
    review: "",
  }); 
  const {review} = formState


  useEffect(() => {
    addReview();
  }, [])
  return (
    <>
        <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="review">Afeigeix un nou comentari</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="review" name="review" placeholder="Escriu la teva review aquí.." value = { review } onChange={handleChange} />
            </div>
            <button className="addReviewButton"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addReview(formState,id,authToken));
                    dispatch(setAddreview(false));
                  }}>
                  Desa la Review
            </button>
            <button className="addReviewButton"
                  onClick={(e) => {
                    e.preventDefault();
                    OnResetForm();
                  }}>
                  Buida
            </button>
          </form>
        </div>
    </>
  )
}
