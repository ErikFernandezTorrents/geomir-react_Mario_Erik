import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../../userContext";
import '../../App.css'
import { Comment } from './Comment';
import { CommentAdd } from './CommentAdd';
import { useParams } from 'react-router-dom';
import { setAddcomment } from '../../slices/comments/commentSlice';
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../slices/comments/thunks";
import { setCommentsCount } from "../../slices/comments/commentSlice";

export const CommentsList = ({id, comments_count}) => {
  let { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { comments = [], page=0, isLoading=false, add=true, error="", commentsCount=0 } = useSelector((state) => state.comments);
  
  useEffect(() => {
    dispatch(setCommentsCount(comments_count))
    dispatch(getComments(0, id, authToken,email));
  }, []);

  return (
    <>

      {comments.map((v) => {
        return <Comment key={v.id} comment={v} />;
      })}

      {add == true && <CommentAdd id={id} />}
        {error ? (
        <div>
          {error}
        </div>
      ) : (
        <></>
      )}

    </>
  )
}