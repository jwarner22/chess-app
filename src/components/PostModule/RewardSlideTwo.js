import {useEffect, useState} from 'react'
import { PageContainer } from "../UI_Kit/Page";
import { RewardContentContainer, RewardH2 } from "./PostModuleElements";
import styled from 'styled-components';
import CountUp from 'react-countup'
import {FastCounter} from 'react-smooth-counter'

const EloRewards = (props) => {
    const [show, setShow] = useState(false)
    //console.log(props)
    const diff = props.newRating - props.initialRating;
    const color = diff > 0 ? '#29CC7D' : '#FD5348';
    useEffect(() => {
        let showTimeout = setTimeout(() => setShow(true), 1000)
        return () => clearTimeout(showTimeout)
    },[])
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
        {show && <div style={{color:color, fontWeight: '400', fontSize: '24px', textAlign: 'top'}}
>      {(diff > 0) ? `+${diff}` : {diff} }</div>}
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