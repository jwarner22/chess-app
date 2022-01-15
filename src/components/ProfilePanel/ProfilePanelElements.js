import React from "react"
import styled from "styled-components"
import { CgProfile } from "react-icons/cg";
export const ProfilePanelHeader = styled.div`
    border-bottom: 2px solid #e5e5e5;
    display: flex;
    font-size: 19px;
    font-weight: 700;
    justify-content: center;
    padding: 16px;
    color: #fff;
    width: 100%;
    margin-bottom: 24px;
    background: linear-gradient(143.66deg, #000DFF 21.19%, #6B73FF 78.81%);
`
export const AchievementsHeader = styled.div`
    border-top: 2px solid #54606c;
    color: #000;
    opacity: 0.7;
    display: flex;
    font-size: 19px;
    font-weight: 700;
    justify-content: center;
    padding: 16px;
    width: 100%;
    margin: 24px 0 12px 0;
`

export const PageBodyContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const ProfilePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`
export const ProfilePanelWrapper = styled.div`
    display: flex;
    min-height: 175px;
    margin: 16px;
    padding: 16px;
    border-radius: 10px;
    //opacity @ 20% looks really nice
    background-image: linear-gradient(to right bottom, #247cf1, #1464e4, #164bd5, #232fc3, #2f00af);
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1100px;
`
export const ProfilePanelContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`

export const ProfilePanelImageContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const ProfilePagePlaceholder = styled.img`
    max-width: 80px;
`


export const ProfilePanelUsernameWrapper = styled.div`
    display: flex;
    min-height: 90%;
    margin: 6px;
    color: #fff;
    font-weight: 600;
    font-size: 1.25rem;
`
export const ProfilePanelButton = styled.button`
    width: 130px;
    height: 35px;
    left: 46px;
    top: 122px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin: 6px;
    outline: none;
    border: none;
    cursor: pointer;
`
export const CalendarTitleWrapper = styled.div`
    display: flex; 
    justify-content: flex-start;
    align-items: center;
    margin: 8px;
`

export const ClockIcon = styled.img`
    width: 12px;
    margin-right: 4px;
`

export const CalendarTitle = styled.h3`
    color: white;
    font-size: 12px;
    font-weight: 400;
`
export const CalendarBackgroundWrapper = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
`
export const CalendarBackground = styled.div`
    width: 320px;
    height: 39px;
    left: 46px;
    top: 199px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
`
// export const ProfilePageImg = styled(CgProfile){
// }
export const CalendarGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    height: 100%;
    text-align: center;
    padding: auto 0px;
    align-items: center;
`
export const CalendarDay = styled.li`
    color: #fff;
    list-style-type: none;
    font-weight:600;
    `