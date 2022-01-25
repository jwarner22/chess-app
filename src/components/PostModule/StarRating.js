import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import useFetch from '../api/useFetch';
import {baseURL} from '../api/apiConfig';

function StarRating(props) {
  const [ratingValue, setRatingValue] = useState(0);
  const [posted, setPosted] = useState(false);

  const {failure, perfect, score, userData} = props;
  const isDaily = (props.isDaily == null) ? false : props.isDaily;
  const {post} = useFetch(baseURL);
  const userId = localStorage.getItem('userID');

  const handleRating = (rate) => {
    setRatingValue(rate)
  }
  
  const onClick = (e) => {
      handleRating(e)
      if (!posted) {
        // api call for rating goes here
        let endpoint = `/users/${userId}/themes/ratings/${ratingValue}`;
        post(endpoint, {
          user_rating: e,
          failure: failure,
          isDaily: isDaily,
          perfect: perfect,
          score: score,
          inserted_at: Date.now(),
          ...userData,
          theme_id: userData.id
        })
        //post
        setPosted(true)
      }

  }

  return (
      <>
      <div> {posted ? 'Response submitted.  Thanks for your feedback!' : 'How would you rate this module?'}</div>
    <Rating
    onClick={onClick}
    ratingValue={ratingValue}
    //fillColor={'000DFF'}
    showTooltip
    tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Perfect']}
    //fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
    /> 
     </>
  )
}
export default StarRating