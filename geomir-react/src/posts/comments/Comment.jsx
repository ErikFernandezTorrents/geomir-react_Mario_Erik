import React, { useState, useContext, useEffect, useCallback } from 'react';
import '../../App.css'
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { UserContext } from '../../userContext';
import { useDispatch, useSelector } from "react-redux";
import { delComment } from "../../slices/comments/thunks";
import { setAddcomment } from '../../slices/comments/commentSlice';

export const Comment = ({comment}) => {
    const formatter = buildFormatter(spanishStrings)
    const { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
    const { comments = [], page=0, isLoading=true, add=true, error="", commentsCount=0 } = useSelector((state) => state.comments);
    const dispatch = useDispatch();
  return (
      <>
            <div className='Commentcontainer'>
                <h3>Comment de {comment.user.name}</h3>
                <p>{comment.comment}</p>
                <div className='dateOfComment'>
                    <TimeAgo date={comment.created_at} formatter={formatter} />
                </div>
                {(usuari == comment.user.email)&& 
                    <button className='deleteButton'
                        onClick={(e) => {
                        dispatch(delComment(comment,authToken));
                        dispatch(setAddcomment(true));
                        }}><i className="bi bi-trash3"></i>
                    </button>
                }
            </div>
      </>
  )
}