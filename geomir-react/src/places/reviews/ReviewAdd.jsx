import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../userContext";
import { useNavigate } from 'react-router';
import '../../App.css'
import { useParams } from 'react-router-dom';

export const ReviewAdd = () => {
  let { authToken,setAuthToken } = useContext(UserContext);
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let [refresh,setRefresh] = useState(false)
  let [addreview, setAddreview] = useState(true);
  const { id } = useParams();
  let [formulari, setFormulari] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
          setFormulari({
            ...formulari,
            [e.target.name] : e.target.value

          })
      
  }

  const addReview = async(e)=>{
    e.preventDefault();
    let {review}=formulari;
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
        setRefresh(!refresh);
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

  }, [refresh])
  return (
    <>
        <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="review">Afeigeix un nou comentari</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="review" name="review" placeholder="Escriu la teva review aquí.." value = { formulari.review } onChange={handleChange}/>
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
    </>
  )
}
