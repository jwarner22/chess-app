import React from 'react'
import styled from "styled-components"


const OpeningNav = (props) => {

    if (!props.startedDemo) {
        return(
            <PuzzleNavContainer>
            <NavBtn>
                <StartBtn onClick={props.startDemo}>Start</StartBtn>
            </NavBtn>
            </PuzzleNavContainer>
        )
    } else if (props.demoIsFinished) {
    return (
        <>
        <PuzzleNavContainer>
            <NavBtn>
                <NavBtnLink2 props={props} onClick={props.onRetryClick} disabled={props.retryDisabled}>
                    Retry
                </NavBtnLink2>
            </NavBtn>
            <NavBtn> 
                <NavBtnLink props={props} onClick={props.onContinueClick} disabled={props.continueDisabled}>
                    Continue
                </NavBtnLink>
            </NavBtn>
        </PuzzleNavContainer>
                    <NavBtnCenter> 
                    <NavBtnLink3 props={props} onClick={props.onShowMovesClick} disabled={props.showDisabled}>
                        Show Moves
                    </NavBtnLink3>
                </NavBtnCenter>
                </>
    )
    } else{
        return(
        <PuzzleNavContainer>
        <Text>Replicate the moves...</Text>
        </PuzzleNavContainer>
        )
    }
}

export default OpeningNav

const Text = styled.div`
    color: white;
    padding: 18px 18px;
`

const PuzzleNavContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    /* background-color: #afafaf33; */
    grid-row: 3;
    justify-content: space-evenly;
    align-items: center;

`
export const NavBtn = styled.nav `
    display: flex;
    align-items: center;
    margin: 18px;
`
export const NavBtnCenter = styled.nav `
    display: flex;
    align-items: center;
    margin: 18px;
    justify-content: center;
`

const NavBtnLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.continueDisabled) ? 'rgba(255, 255, 255, 0.4)' : '#fff')};
    white-space: nowrap;
    padding: 16px 16px;
    color: #247cf1;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 120px;
    font-weight: 700;
`;

const NavBtnLink2 = styled.button`
       border-radius: 16px;
    background: transparent;
    white-space: nowrap;
    padding: 16px 16px;
    color: ${({props}) => ((props.retryDisabled) ? 'rgba(255, 255, 255, 0.4)': '#fff')};
    font-size: 22px;
    outline: none;
    border: ${({props}) => ((props.retryDisabled) ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid #fff')};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 120px;
    font-weight: 700;

    /* &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #247cf1;
    } */
`;


const NavBtnLink3 = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.showDisabled) ? 'rgba(255, 255, 255, 0.4)' : '#fff')};
    white-space: nowrap;
    padding: 16px 16px;
    justify-content: center;
    color: #247cf1;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 120px;
    font-weight: 700;
`;

const StartBtn = styled.button`
border-radius: 16px;
background: 'rgba(255, 255, 255, 0.4)';
white-space: nowrap;
padding: 16px 16px;
color: #247cf1;
font-size: 22px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
min-width: 120px;
font-weight: 700;
`;