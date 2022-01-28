import React from 'react'
import styled from "styled-components"
import { ClickBack } from '../../BackButton';
import {useHistory} from "react-router-dom"
import swal from 'sweetalert';
import { TiArrowBackOutline } from "react-icons/ti";
import { AiOutlineRedo } from "react-icons/ai";
import { GrFormNextLink } from "react-icons/gr";
import { MobileNavbarItem, MobileNavbarItems, MobileNavbarWrapper, MobileNavLink } from '../../PostLogin/MobileNavBar/MobileNabarElements'


const PuzzleNav = (props) => {

    let history = useHistory();

    const handleClick = () => { 
        swal({
            title: "Are you sure?",
            text: "All progress will be lost.",
            icon: "warning",
            dangerMode: true,
            buttons: true        
          })
          .then(willDelete => {
            if (willDelete) {
                history.goBack()
            }
          });
    }

    return (
        <MobileNavbarWrapper>
            <PuzzleNavbarItems>
            <PuzzleNavContainer>
                <BackButtonWrapper>
                    <TiArrowBackOutline size={32} onClick={() => handleClick()}>Back</TiArrowBackOutline>
                </BackButtonWrapper>
                    <RetryButtonLink props={props} onClick={props.onRetryClick} disabled={props.retryDisable}>
                        <AiOutlineRedo size={32}>
                            Redo
                        </AiOutlineRedo>
                    </RetryButtonLink>
                    <NextButtonLink props= {props} onClick={props.onContinueClick} disabled={props.disabled}>
                        <GrFormNextLink size={32}>
                            Next
                        </GrFormNextLink>
                    </NextButtonLink>
            </PuzzleNavContainer>
            </PuzzleNavbarItems>
        </MobileNavbarWrapper>
    )
}

export default PuzzleNav

export const PuzzleNavbarItems = styled.ul`
    display: grid;
    grid-template-columns: auto;
    background-color: #fff;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    width: 100vw;
`

const PuzzleNavContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 16px;

`
export const NavBtn = styled.nav `
    display: flex;
    align-items: center;
`

const NextButtonLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.disabled) ? 'transparent' : 'green')};;
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
    /* border: 2px solid black */
`;
// don't need hover with conditional styling
// &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #0e65d8;
//     color: #fff;
// }

const RetryButtonLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.retryDisable) ? 'transparent' : 'red')};
    white-space: nowrap;
    padding: 16px 16px;
    color: #000;
    font-size: 22px;
    outline: none;
    border: ${({props}) => ((props.retryDisable) ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid #fff')};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 120px;
    font-weight: 700;
    /* border: 2px solid black */
`

const BackButtonWrapper = styled.div`
    border-radius: 16px;
    white-space: nowrap;
    padding: 16px 16px;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 120px;
    font-weight: 700;
    text-align: center;
`