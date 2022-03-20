import React from 'react';
import styled from 'styled-components'
import Button from '../Button/Button';
import { InfoBoxContainer, 
    InfoBoxImageContainer, 
    InfoBoxImg, 
    InfoBoxSubTitle, 
    InfoBoxTitle,
    InfoBoxStatContainer,
 } from './InfoBoxElements';
 import StatBox from './StatBox';
import BenefitsContainer from '../Boxes/Containers/Benefits';
 

const InfoBox = (props) => {

const modifiedCategory = `${props.category}s`

  return (
  <>
    <InfoBoxContainer>
        <InfoBoxImageContainer>
            <InfoBoxImg src={props.image}/> 
        </InfoBoxImageContainer>
        <InfoBoxTitle>
            {props.title}
        </InfoBoxTitle>
        <InfoBoxSubTitle>
            {props.subtitle}
        </InfoBoxSubTitle>
        <InfoBoxStatContainer>
            <StatBox statTitle={props.headlineOne} statData={props.dataOne}/>
            <StatBox statTitle={props.headlineTwo} statData={props.dataTwo}/>
        </InfoBoxStatContainer>
        <BenefitsContainer moduleType={modifiedCategory} category={modifiedCategory} />
        {/* {isOpening ? <OpeningImage/> : null} */}
        <InfoBoxStatContainer>
        <InfoBoxButton primary onClick={() => props.onStartClick('white')}>
            {props.buttonOneTitle}
        </InfoBoxButton>
        <InfoBoxButton primary onClick={() => props.onStartClick('black')}>
            {props.buttonTwoTitle}
        </InfoBoxButton>
        </InfoBoxStatContainer>
    </InfoBoxContainer>
  </>
  )
};

export default InfoBox;

const InfoBoxButton = styled(Button)`
    padding: 12px 24px;
    margin: 24px 12px;
`