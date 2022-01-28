import React from 'react';
import { InfoBoxStat, StatBoxHeadline, StatContainer } from './StatBoxElements';

const StatBox = (props) => {

    console.log(props)
  return (
<>
    <StatContainer>
        <StatBoxHeadline>
            {props.statTitle}
        </StatBoxHeadline>
        <InfoBoxStat> 
            {props.statData}       
        </InfoBoxStat>
    </StatContainer>
  </>
  )};

export default StatBox;
