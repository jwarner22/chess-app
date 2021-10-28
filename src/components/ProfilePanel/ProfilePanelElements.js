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
    background-color: #fff;
    width: 100%;
`
export const AchievementsHeader = styled.div`
    border-bottom: 2px solid #e5e5e5;
    color: #afafaf;
    display: flex;
    font-size: 19px;
    font-weight: 700;
    justify-content: center;
    padding: 16px;
    background-color: #fff;
    width: 100%;
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
    min-height: 200px;
    margin: 16px;
    padding: 16px;
    border-radius: 10px;
    //opacity @ 20% looks really nice
    background-image: linear-gradient(to right bottom, #247cf1, #1464e4, #164bd5, #232fc3, #2f00af);
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    max-width: 1100px;
`
export const ProfilePanelContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
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
export const CalendarTitle = styled.h3`
    color: white;
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