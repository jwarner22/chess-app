import React from 'react'
import styled from "styled-components"
import { ClickBack } from '../../BackButton';
import {useHistory} from "react-router-dom"
import swal from 'sweetalert';
import { TiArrowBackOutline } from "react-icons/ti";
import { AiOutlineRedo } from "react-icons/ai";
import { GrFormNextLink, GrNext } from "react-icons/gr";
import { GiCheckMark } from "react-icons/gi";
import { MobileNavbarItem, 
    MobileNavbarItems, 
    MobileNavbarWrapper, 
    MobileNavLink } from '../../PostLogin/MobileNavBar/MobileNabarElements'


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
            <PuzzleNavContainer>
                <BackButtonWrapper>
                    <BackButtonArrow onClick={() => handleClick()}>Back</BackButtonArrow>
                </BackButtonWrapper>
                    <RetryButtonLink props={props} onClick={props.onRetryClick} disabled={props.retryDisable}>
                        <RetryIcon>
                            Redo
                        </RetryIcon>
                    </RetryButtonLink>
                    <NextButtonLink props= {props} onClick={props.onContinueClick} disabled={props.disabled}>
                        <NextIcon props={props}>
                            Next
                        </NextIcon>
                    </NextButtonLink>
            </PuzzleNavContainer>
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
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;

`
export const NavBtn = styled.nav `
    display: flex;
    align-items: center;
`

const NextButtonLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.disabled) ? 'transparent' : 'green')};
    white-space: nowrap;
    padding: 16px 16px;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 40px;
    font-weight: 700;
    width: 60%;
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

const BackButtonArrow = styled(TiArrowBackOutline)`
    fill: #9CA1BC;
    width: 32px;
    height: 32px;
`

const RetryIcon = styled(AiOutlineRedo)`
    fill: #C4C5D4;
    width: 32px;
    height: 32px;
`

const NextIcon = styled(GiCheckMark)`
    fill: ${({props}) => ((props.disabled) ? '#C4C5D4' : '#fff')};
    width: 32px;
    height: 32px;
    stroke: none;
`