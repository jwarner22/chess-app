import React from 'react'
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import swal from 'sweetalert';
import { BsFillReplyFill } from "react-icons/bs";
import {ReactComponent as Retry} from "../../../Images/retry.svg"
import {ReactComponent as Next} from "../../../Images/right-arrow.svg"
import {MobileNavbarWrapper} from '../../PostLogin/MobileNavBar/MobileNabarElements'


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
                        <RetryIcon props={props}/>
                            <RetryButtonSpan props={props}>
                                Retry
                            </RetryButtonSpan>
                    </RetryButtonLink>
                    <NextButtonLink props= {props} onClick={props.onContinueClick} disabled={props.disabled}>
                        <NextIcon props={props} />
                        <NextButtonSpan props={props}>
                            Next
                        </NextButtonSpan>
                    </NextButtonLink>
            </PuzzleNavContainer>
        </MobileNavbarWrapper>
    )
}

export default PuzzleNav

// const PuzzleNavbarWrapper = styled(MobileNavbarWrapper)`
//     position: relative;
// `

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
    background: ${({props}) => ((props.disabled) ? 'transparent' : 'rgba(41,204,125)')};
    white-space: nowrap;
    padding: 8px 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const NextButtonSpan = styled.span`
    color: ${({props}) => ((props.disabled) ? 'null' : 'white')};
    display: ${({props}) => ((props.disabled) ? 'none' : 'inline-block')};
    font-size: 12px;
    transition: all 0.2s ease-in-out;
`
// don't need hover with conditional styling
// &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #0e65d8;
//     color: #fff;
// }

const RetryButtonLink = styled.button`
    border-radius: 16px;
    background: ${({props}) => ((props.retryDisable) ? 'transparent' : 'rgb(253, 83, 72)')};
    white-space: nowrap;
    padding: 8px 16px;
    color: #000;
    outline: none;
    border: ${({props}) => ((props.retryDisable) ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid #fff')};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 2px solid black */
`

const RetryButtonSpan = styled.span`
    color: ${({props}) => ((props.retryDisable) ? 'null' : 'white')};
    display: ${({props}) => ((props.retryDisable) ? 'none' : 'inline-block')};
    font-size: 12px;
    transition: all 0.2s ease-in-out;
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
    font-weight: 700;
    text-align: center;
`

const BackButtonArrow = styled(BsFillReplyFill)`
    fill: #242424;
    width: 32px;
    height: 32px;
    transform: scaleX(-1);
`

const RetryIcon = styled(Retry)`
    fill: ${({props}) => ((props.disabled) ? '#C4C5D4' : '#fff')};
    width: 32px;
    height: 32px;
    transition: all 0.2s ease-in-out;
`

const NextIcon = styled(Next)`
    fill: ${({props}) => ((props.disabled) ? '#C4C5D4' : '#fff')};
    width: 32px;
    height: 32px;
    stroke: none;
    transition: all 0.2s ease-in-out;
`