import React from 'react'
import { BenefitsFlexbox, BenefitsImg, BenefitsText } from './BenefitsContainerElements';

const Benefits = (props) => {

    const {text, category, id, img} = props; 
    console.log(props)

  return (
    <>
      <BenefitsFlexbox>
        <BenefitsImg src={img}/>
        <BenefitsText>{text}</BenefitsText>
      </BenefitsFlexbox>
    </>
  )
}

export default Benefits

