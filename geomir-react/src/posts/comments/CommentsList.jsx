import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../../userContext";
import '../../App.css'
import { Comment } from './Comment';
import { CommentAdd } from './CommentAdd';
import { useParams } from 'react-router-dom';

export const CommentsList = () => {
  const { id } = useParams();
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let [comments, setComment] = useState([]);
  let [refresh,setRefresh] = useState(false)
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let [addcomment, setAddcomment] = useState(true);
  const canviRefresh =()=>{
    setRefresh(!refresh);
  }
  const sendCommentsList = async (e) => {
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments", {
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
                setComment(resposta.data)
                console.log(resposta.data);
                resposta.data.map((v)=>{
                    if (v.user.email==usuari){
                        setAddcomment(false);
                    }
                })
          }else{
              setMissatge(resposta.message);
          }

    }catch {
      alert("Estem tenint problemes amb la xarxa");
    }
  }
  const deleteComment = async (e,idcomment) =>{
    e.preventDefault();
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id +"/comments/"+idcomment, {
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
                canviRefresh();
                setAddcomment(true)
                console.log("Post eliminat correctament");
            }else{
                setMissatge(resposta.message);
            }
  
      }catch {
        console.log(data);
        alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
      }
  }
  
  useEffect(() => { 

    sendCommentsList();
    
  }, [refresh]);

  return (
    <>
        {comments.map((comment) => (
            <div  key={comments.id} > 
              {(usuari == comment.user.email && addcomment==true)}
              <Comment comment={comment} deleteComment={deleteComment}/>
            </div>
        ))}
        { addcomment == true && <CommentAdd canviRefresh={canviRefresh}/>}
    </>
  )
}