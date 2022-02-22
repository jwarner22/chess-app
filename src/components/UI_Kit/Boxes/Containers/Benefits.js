import React, { useEffect, useState } from 'react'
import { BenefitsFlexbox, BenefitsImg, BenefitsText } from './BenefitsContainerElements';
import { BenefitsTitle, BenefitsWrapper } from './BenefitsContainerElements';
import {BenefitsData} from "../../../../data/BenefitsData"


const Benefits = (props) => {
  const [benefits, setBenefits] = useState([]);
  const {category, headline} = props;
  const [headlineData, setHeadlineData] = useState([]);

  useEffect(() => {
    getBenefits();
  },[headline]) 

  const getBenefits = () => {
    if (headlineData.some(item => item.headline === headline)) {
      let newHeadline = headlineData.filter(item => item.headline === headline);
      setBenefits(newHeadline[0].benefits);
      return;
    };
    // extract benefits from BenefitsData based on category
    const benefits = BenefitsData.filter(benefit => benefit.category === category);
    // shuffle benefits
    const shuffledBenefits = shuffleBenefits(benefits);
    // return first 2 benefits
    const slicedBenefits = shuffledBenefits.slice(0,2);
    // render benefits
    setBenefits(slicedBenefits);
    setHeadlineData([...headlineData, {headline, benefits: slicedBenefits}]);
  }

  const shuffleBenefits = (array) => {
    var i = array.length,
    j = 0,
    temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  return (
    <>
        <BenefitsTitle>
            Benefits:
        </BenefitsTitle>
        <BenefitsWrapper>
            {benefits.map((benefit, index) => {
              return(
                <div key={index}>
          <BenefitsFlexbox>

                <BenefitsImg src={benefit.img}/>
                <BenefitsText>{benefit.text}</BenefitsText>
                </BenefitsFlexbox>
                </div>
              )
            })}
                         
        </BenefitsWrapper>

  </>
  )
}
export default Benefits;