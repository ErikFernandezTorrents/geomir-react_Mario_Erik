import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../userContext";
import { useNavigate } from 'react-router';
import '../../App.css'
export const ReviewAdd = () => {
  let { authToken,setAuthToken } = useContext(UserContext);
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let navigate = useNavigate();
  let [addreview, setAddreview] = useState(true);

  const addReview = async(e)=>{
    e.preventDefault();
  
    var formData = new FormData();
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
        console.log("Review creat amb exit!!");
      } 

      else{
        console.log(resposta.message);
      } 
        
    }catch{
      console.log("Error");
    } 
    
  }
  useEffect(() => {
    addReview();

  }, [])
  return (
    <>
      {(addreview == true) ?
        <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="review">Afeigeix un nou comentari</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="review" name="review" placeholder="Escriu la teva review aquí.." onChange={(e) => {addReview(e.target.value);}}/>
            </div>
            <button className="addReviewButton"
                  onClick={(e) => {
                    addReview(e);
                    setAddreview(false)
                  }}>
                  Desa la Review
            </button>
          </form>
        </div>
      :<div></div>}
    </>
  )
}
