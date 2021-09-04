import React from 'react'
import styled from "styled-components"

const PuzzleNav = () => {
    return (
        <PuzzleNavContainer>
            <NavBtn>
                <NavBtnLink2>
                    Skip
                </NavBtnLink2>
            </NavBtn>
            <NavBtn> 
                <NavBtnLink>
                    Continue
                </NavBtnLink>
            </NavBtn>
        </PuzzleNavContainer>
    )
}

export default PuzzleNav


const PuzzleNavContainer = styled.div`
    display: flex;
    width: 100vw;
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
    border-radius: 50px;
    background: #247cf1;
    white-space: nowrap;
    padding: 8px 32px;
    margin: 0px 16px;
    color: #fff;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
    }
`;

const NavBtnLink2 = styled.button`
    border-radius: 50px;
    background: transparent;
    white-space: nowrap;
    padding: 6px 32px;
    margin: 0px 16px;
    color: #afafaf;
    font-size: 22px;
    outline: none;
    border: 2px solid #afafaf;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #247cf1;
    }
`;