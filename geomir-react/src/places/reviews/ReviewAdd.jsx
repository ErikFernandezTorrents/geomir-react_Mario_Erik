import React, { useContext, useEffect } from 'react'
import { UserContext } from "../../userContext";
import '../../App.css'
import { useForm } from "react-hook-form";
import { addReview } from '../../slices/reviews/thunks';
import { setAddreview } from '../../slices/reviews/reviewSlice';
import { useDispatch } from 'react-redux';

export const ReviewAdd = ({id}) => {
  let { authToken,setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { register, handleSubmit,reset,formState: { errors }} = useForm();
  const onSubmit = (formData) => {
    const dataWithId = {
      id: id,
      authToken: authToken,
      ...formData,
    };
    console.log(dataWithId);
    dispatch(addReview(dataWithId));
    dispatch(setAddreview(false));
  };
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
              <textarea id="review" name="review" placeholder="Escriu la teva review aquí.." {...register("review",{
                minLength: {
                    value: 10,
                    message: "La opinió ha de tenir almenys 10 caràcters"
                },
                maxLength: {
                    value: 200,
                    message: "La opinió ha de tenir com a màxim 200 caràcters"
                },
                pattern: {
                    value: /^((\S+\s+){2}\S+){1,}\s*$/, // Expresión regular para validar la longitud y número de palabras
                    message:"La review ha de contenir almenys 3 paraules i tenir una longitud màxima de 200 caràcters"
                }
              })} />
            </div>
            {errors.review && <div className='AlertError'>{errors.review.message}</div>}
            <button className="addReviewButton"
                  onClick={handleSubmit(onSubmit)}>
                  Desa la Review
            </button>
            <button className="addReviewButton"
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}>
                  Buida
            </button>
          </form>
        </div>
    </>
  )
}
