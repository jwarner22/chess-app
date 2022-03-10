import { PageContainer } from "../UI_Kit/Page";
import { RewardContentContainer, RewardH2 } from "./PostModuleElements";
import styled from 'styled-components';
import CountUp from 'react-countup'
import {FastCounter} from 'react-smooth-counter'

const EloRewards = (props) => {
    console.log(props)
    return (<>
    <RewardContentContainer>
        <EloHeadline>
            Elo Rewards
        </EloHeadline>
        <FastCounter 
        delay={0}
        startNumber={props.initialRating}
        to={props.newRating}
        style={{color:'#54606c', fontWeight: '400', fontSize: '48px', textAlign: 'center'}}
        />
    </RewardContentContainer>
    </>
    )
  }
  
  export default EloRewards

  const EloHeadline = styled.h2`
    color: #54606c;
    text-align: center;
    margin-bottom: 20px;
  `