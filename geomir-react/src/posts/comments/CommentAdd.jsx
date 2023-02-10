import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../userContext";
import { useNavigate } from 'react-router';
import '../../App.css'
import { useParams } from 'react-router-dom';

export const CommentAdd = ({canviRefresh}) => {
  let { authToken,setAuthToken } = useContext(UserContext);
  let [missatge, setMissatge] = useState("");
  let [missatgeOK, setMissatgeOK] = useState("");
  let [refresh,setRefresh] = useState(false)
  let [addcomment, setAddcomment] = useState(true);
  const { id } = useParams();
  let [formulari, setFormulari] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
          setFormulari({
            ...formulari,
            [e.target.name] : e.target.value

          })
      
  }

  const addComment = async(e)=>{
    e.preventDefault();
    let {comment}=formulari;
    var formData = new FormData();
    console.log(comment);
    formData.append("comment", comment);
    
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments", {
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
        console.log("Comment creat amb exit!!");
      } 

      else{
        console.log(resposta.message);
      } 
        
    }catch (err) {
      console.log(err);
    } 
    
  }

  useEffect(() => {
    addComment();

  }, [refresh])
  return (
    <>
        <div className='CommentForm'>
          <form id="formAddComment" className='CommentForm2'>
            <div className='labelCommentContainer'>
                <label htmlFor="comment">Afeigeix un nou comentari</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="comment" name="comment" placeholder="Escriu la teva comment aquí.." value = { formulari.comment } onChange={handleChange}/>
            </div>
            <button className="addCommentButton"
                  onClick={(e) => {
                    addComment(e);
                    setAddcomment(false)
                  }}>
                  Desa el Comment
            </button>
          </form>
        </div>
    </>
  )
}