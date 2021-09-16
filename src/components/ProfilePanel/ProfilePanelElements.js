import React from "react"
import styled from "styled-components"
import { CgProfile } from "react-icons/cg";

export const ProfilePanelHeader = styled.div`
    border-bottom: 2px solid #e5e5e5;
    color: #afafaf;
    display: flex;
    font-size: 19px;
    font-weight: 700;
    justify-content: center;
    padding: 16px;
`

export const ProfilePanelContainer = styled.div`
    width: 100%;
`

export const ProfilePanelWrapper = styled.div`
    display: flex;
    min-height: 200px;
    margin: 16px;
    border-radius: 10px;
    background-image: linear-gradient(to right bottom, #247cf1, #1464e4, #164bd5, #232fc3, #2f00af);
    justify-content: flex-start;
    align-items: center;
`
export const ProfilePanelImgWrapper = styled.div`
    display: flex;
    border: 2px white solid; 
    min-height: 90%;
    margin: 16px;
`

// export const ProfilePageImg = styled(CgProfile){

// }
