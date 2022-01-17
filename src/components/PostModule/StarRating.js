import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

function StarRating() {
  const [ratingValue, setRatingValue] = useState(0);
  const [posted, setPosted] = useState(false);
  const userId = localStorage.getItem('userID');

  const handleRating = (rate) => {
    setRatingValue(rate)
  }

  const onClick = (e) => {
      console.log(e)
      handleRating(e.ratingValue)
      if (!posted) {
      // api call for rating goes here
      let endpoint = `/users/${userId}/themes/ratings/${ratingValue}`;

      //post
      setPosted(true)
      }

  }

  return (
      <>
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