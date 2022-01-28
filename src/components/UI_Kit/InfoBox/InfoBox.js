import React from 'react';
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
    </InfoBoxContainer>
  </>
  )
};

export default InfoBox;
