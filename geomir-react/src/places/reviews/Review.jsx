import React, { useState, useContext, useEffect, useCallback } from 'react';
import TimeAgo from 'react-timeago'
import '../../App.css'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { UserContext } from '../../userContext';

export const Review = ({review,deleteReview}) => {
    const formatter = buildFormatter(spanishStrings)
    let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)

  return (
      <>
            <div className='Reviewcontainer'>
                <h3>Review de {review.user.name}</h3>
                <p>{review.review}</p>
                <div className='dateOfReview'>
                    <TimeAgo date={review.created_at} formatter={formatter} />
                </div>
                {(usuari == review.user.email)&& 
                    <button className='deleteButton'
                        onClick={(e) => {
                        deleteReview(e,review.id); 
                        }}><i className="bi bi-trash3"></i>
                    </button>
                }
            </div>
      </>
  )
}
