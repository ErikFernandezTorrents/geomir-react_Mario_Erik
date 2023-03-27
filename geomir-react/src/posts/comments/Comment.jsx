import React, { useState, useContext, useEffect, useCallback } from 'react';
import '../../App.css'
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { UserContext } from '../../userContext';

export const Comment = ({comment,deleteComment}) => {
    const formatter = buildFormatter(spanishStrings)
    let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)

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
                        deleteComment(e,comment.id);
                        }}><i className="bi bi-trash3"></i>
                    </button>
                }
            </div>
      </>
  )
}