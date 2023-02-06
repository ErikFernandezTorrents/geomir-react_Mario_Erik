import React, { useState, useContext, useEffect, useCallback } from 'react';
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

export const Review = ({review,deleteReview}) => {
    const formatter = buildFormatter(spanishStrings)

  return (
      <>
            <div >
                <h3>Review de {review.user.name}</h3>
                <p>{review.review}</p>
                <TimeAgo date={review.created_at} formatter={formatter} />
            </div>
      </>
  )
}
