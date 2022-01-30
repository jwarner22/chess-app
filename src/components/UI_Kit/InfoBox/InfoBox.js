import React from 'react';
import styled from 'styled-components'
import Button from '../Button/Button';
import { InfoBoxContainer, 
    InfoBoxHeadline, 
    InfoBoxImageContainer, 
    InfoBoxImg, 
    InfoBoxSubTitle, 
    InfoBoxTitle,
    InfoBoxStat,
    InfoBoxStatContainer
 } from './InfoBoxElements';
 import StatBox from './StatBox';
 

const InfoBox = (props) => {
    // const {headline} = props;

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