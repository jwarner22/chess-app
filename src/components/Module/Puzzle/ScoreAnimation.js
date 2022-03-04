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
    height: 36px;
    color: #fff;
    margin-left: 24px;
    padding-right: 8px;
    font-weight: 600;
    align-items: center;
    margin-bottom: 12px;

    @media screen and (max-width: 640px){
        margin-left: 0px;
        justify-content: flex-start;
        width: 175px;
        height: 40px;
        align-items: center;
    }

`


const ScoreValue = styled.span`
    background: #47B24A;
    width: min-content;
    padding: 8px 12px;
    color: white;
    border-radius: 10px;
    margin: auto 4px;
    justify-self: flex-end;
    box-shadow: rgba(255, 255, 255, 0.08) 0px 5px 10px, rgba(255, 255, 255, 0.15) 0px 3px 3px;;
`