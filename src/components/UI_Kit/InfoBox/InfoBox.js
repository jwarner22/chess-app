import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import Button from '../Button/Button';
import { InfoBoxContainer, 
    InfoBoxHeadline, 
    InfoBoxImageContainer, 
    InfoBoxImg, 
    InfoBoxSubTitle, 
    InfoBoxTitle,
    InfoBoxStat,
    InfoBoxStatContainer,
    OpeningImage
 } from './InfoBoxElements';
 import StatBox from './StatBox';
 

const InfoBox = (props) => {
const [puzzleType, setPuzzleType] = useState(props.category)

const isOpening = puzzleType === "opening";




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
            <StatBox statTitle={props.headlineOne} statData={props.userData.high_score}/>
            <StatBox statTitle={props.headlineTwo} statData={props.userData.completed}/>
        </InfoBoxStatContainer>
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
    position: relative;
    top: 40px;
`