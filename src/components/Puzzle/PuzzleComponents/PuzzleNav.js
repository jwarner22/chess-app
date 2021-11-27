import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom";
const PuzzleNav = (props) => {
    console.log(props)
    return (
        <PuzzleNavContainer>
            <NavBtn>
                <NavBtnLink2 props={props} onClick={props.onRetryClick} disabled={props.retryDisable}>
                    Retry
                </NavBtnLink2>
            </NavBtn>
            <NavBtn> 
                <NavBtnLink props= {props} onClick={props.onContinueClick} disabled={props.disabled}>
                    Next
                </NavBtnLink>
            </NavBtn>
        </PuzzleNavContainer>
    )
}

export default PuzzleNav

{/* <Link to={props.isDaily ? '/dailyPuzzle' : '/dashboard'}>
<NavBtnLink2>
    Exit
</NavBtnLink2>
</Link> */}

const PuzzleNavContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    /* background-color: #afafaf33; */
    /* grid-row: 3; */
    /* border-top: 2px #afafaf33 solid; */
    justify-content: space-evenly;
    align-items: center;

`
export const NavBtn = styled.nav `
    display: flex;
    align-items: center;
`

const NavBtnLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.disabled) ? 'rgba(255, 255, 255, 0.4)' : '#fff')};;
    white-space: nowrap;
    padding: 16px 16px;
    margin: 24px;
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
// don't need hover with conditional styling
// &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #0e65d8;
//     color: #fff;
// }

const NavBtnLink2 = styled.button`
    border-radius: 16px;
    background: transparent;
    white-space: nowrap;
    padding: 16px 16px;
    margin: 24px;
    color: ${({props}) => ((props.retryDisable) ? 'rgba(255, 255, 255, 0.4)' : '#fff')};
    font-size: 22px;
    outline: none;
    border: ${({props}) => ((props.retryDisable) ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid #fff')};
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