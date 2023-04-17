import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../userContext";
import '../../App.css'
import { useFormAction, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { setAddcomment } from '../../slices/comments/commentSlice';
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../slices/comments/thunks";

export const CommentAdd = ({id}) => {
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
    dispatch(addComment(dataWithId));
    dispatch(setAddcomment(false));
  };
  useEffect(() => {
    addComment();
  }, []);
  return (
    <>
        <div className='CommentForm'>
          <form id="formAddComment" className='CommentForm2'>
            <div className='labelCommentContainer'>
                <label htmlFor="comment">Afeigeix un nou comentari</label>
            </div>
            <div className='containerTextarea'>
            <textarea id="comment" name="comment" placeholder="Escriu el teu comment aquí.." {...register("comment",{
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
                    message:"el comment ha de contenir almenys 3 paraules i tenir una longitud màxima de 200 caràcters"
                }
              })} />
            </div>
            {errors.comment && <div className='AlertError'>{errors.comment.message}</div>}
            <button className="addCommentButton"
                  onClick={handleSubmit(onSubmit)}>
                  Desa el Comment
            </button>
            <button className="addCommentButton"
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