import React from 'react'
import styled from "styled-components"


const OpeningNav = (props) => {
    console.log(props)
    return (
        <PuzzleNavContainer>
            <NavBtn>
                <NavBtnLink2 props={props} onClick={props.onShowClick} disabled={props.showDisabled}>
                    Show Moves
                </NavBtnLink2>
            </NavBtn>
            <NavBtn> 
                <NavBtnLink props= {props} onClick={props.onContinueClick} disabled={props.continueDisabled}>
                    Continue
                </NavBtnLink>
            </NavBtn>
        </PuzzleNavContainer>
    )
}

export default OpeningNav

const PuzzleNavContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    /* background-color: #afafaf33; */
    grid-row: 3;
    border-top: 2px #afafaf33 solid;
    justify-content: space-evenly;
    align-items: center;

`
export const NavBtn = styled.nav `
    display: flex;
    align-items: center;
`

const NavBtnLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.continueDisabled) ? '#afafaf' : '#247cf1')};
    white-space: nowrap;
    padding: 16px 16px;
    margin: 24px;
    color: #fff;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 150px;
    font-weight: 700;
`;

const NavBtnLink2 = styled.button`
    border-radius: 16px;
    background: transparent;
    white-space: nowrap;
    padding: 16px 16px;
    margin: 24px;
    color: ${({props}) => ((props.showDisabled) ? '#afafaf' : '#247cf1')};
    font-size: 22px;
    outline: none;
    border: ${({props}) => ((props.showDisabled) ? '2px solid #afafaf' : '2px solid #247cf1')};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 150px;
    font-weight: 700;

    /* &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #247cf1;
    } */
`;