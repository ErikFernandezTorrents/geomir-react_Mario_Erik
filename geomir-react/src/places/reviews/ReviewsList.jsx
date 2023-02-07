import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../../userContext";
import '../../App.css'
import { Review } from './Review';
import { ReviewAdd } from './ReviewAdd';
import { useParams } from 'react-router-dom';
export const ReviewsList = () => {
    const { id } = useParams();
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [reviews, setReview] = useState([]);
  let [refresh,setRefresh] = useState(false)
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let [addreview, setAddreview] = useState(true);
  const sendReviewsList = async (e) => {
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
          console.log(resposta);

          if (resposta.success === true) {
                setReview(resposta.data)
                console.log(resposta.data);
                resposta.data.map((v)=>{
                    if (v.user.email==usuari){
                        setAddreview(false);
                    }
                })
          }else{
              setMissatge(resposta.message);
          }

    }catch {
      alert("Estem tenint problemes amb la xarxa");
    }
  }
  const deleteReview = async (e,idreview) =>{
    e.preventDefault();
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +"/reviews/"+idreview, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
            },
            method: "DELETE",
        })
  
        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                setRefresh(!refresh);
                console.log("Place eliminat correctament");
            }else{
                setMissatge(resposta.message);
            }
  
      }catch {
        console.log(data);
        alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
      }
  }
  
  useEffect(() => { 

    sendReviewsList();
    
  }, [refresh]);

  return (
    <>
          
        {reviews.map((review) => (
            <div  key={reviews.id} ><Review review={review} deleteReview={deleteReview}/></div>
        ))}

    </>
  )
}