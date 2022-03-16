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
            Motif Elo
        </EloHeadline>
        <EloContainer>
        <FastCounter 
        delay={400}
        startNumber={props.initialRating}
        to={props.newRating}
        style={{color:'#54606c', fontWeight: '400', fontSize: '48px', textAlign: 'center'}}
        />
        </EloContainer>
    </RewardContentContainer>
    </>
    )
  }
  
  export default EloRewards

  const EloHeadline = styled.h1`
    color: #54606c;
    text-align: center;
    margin-bottom: 20px;
  `

  const EloContainer = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
    align-items: center;
    justify-content: center;
  `