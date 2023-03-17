import React, { useContext } from 'react';
import TimeAgo from 'react-timeago'
import '../../App.css'
import spanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { UserContext } from '../../userContext';
import { delReview } from '../../slices/reviews/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const Review = ({ review }) => {

    const formatter = buildFormatter(spanishStrings)
    const { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

    const { reviews = [], page = 0, addreview = true, missatge = "" } = useSelector((state) => state.reviews);

    const dispatch = useDispatch();

    return (
        <>
            <div className='Reviewcontainer'>
                <h3>Review de {review.user.name}</h3>
                <p>{review.review}</p>
                <div className='dateOfReview'>
                    <TimeAgo date={review.created_at} formatter={formatter} />
                </div>
                {(usuari == review.user.email) &&
                    <button className='deleteButton'
                        onClick={() => {
                            dispatch(delReview(review,authToken));
                        }}><i className="bi bi-trash3"></i>
                    </button>
                }
            </div>
        </>
    )
}
