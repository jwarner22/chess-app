import React from "react"
import styled from 'styled-components'

export const MobilePuzzleContainer = styled.div`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background: linear-gradient(90deg, hsla(244, 36%, 52%, 1) 0%, hsla(214, 88%, 54%, 1) 100%);
`
export const MobilePuzzleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: linear-gradient(90deg, hsla(244, 36%, 52%, 1) 0%, hsla(214, 88%, 54%, 1) 100%);
`
export const MobileHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0px 8px 0px;
    margin-top: 1.5rem;
`
export const MobileContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    background: rgba(255, 255, 255, 0.2);
    flex-grow: 1

`
