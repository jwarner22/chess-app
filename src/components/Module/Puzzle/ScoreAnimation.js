import TransitionGroup from "react-transition-group";
import styled from 'styled-components'

export default function Score(props) {
    console.log('child rendedered')
    return (
        <>
        
            <ScoreContainer>
                Time Bonus: 
            {props.currentBonus !=0 ? (<ScoreValue className="Score--bounce">
            {props.children}
            </ScoreValue>) : (null)} 
            </ScoreContainer>
      
    </>
    )
}

const ScoreContainer = styled.div`
    display: flex;
    height: 24px;
    color: #fff;
    margin-left: 24px;

`


const ScoreValue = styled.span`
    background: green;
    width: min-content;
    padding: 4px;
    color: white;
    line-height: 16px;
    border-radius: 20px;
`