import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../userContext";
import { useNavigate } from 'react-router';
import '../../App.css'
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const ReviewAdd = ({canviRefresh}) => {
  let { authToken,setAuthToken } = useContext(UserContext);
  let [addreview, setAddreview] = useState(true);
  const { id } = useParams();

  const { formState, handleChange,OnResetForm } = useForm({
    review: "",
  }); 
  const {review} = formState
  const addReview = async(e)=>{
    e.preventDefault();
    var formData = new FormData();
    console.log(review);
    formData.append("review", review);
    
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData

      })
      const resposta = await data.json();
      if (resposta.success === true){
        console.log(resposta);
        canviRefresh();
        console.log("Review creat amb exit!!");
      } 

      else{
        console.log(resposta.message);
      } 
        
    }catch (err) {
      console.log(err);
    } 
    
  }

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
                    addReview(e);
                    setAddreview(false)
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
