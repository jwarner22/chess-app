import React from "react"
import styled from "styled-components"

export const AchievementTileContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const AchievementTileWrapper = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
    justify-content: center;
    max-width: 704px;
    width: 90%;
    margin-bottom: 18px;
    
`
export const LargeTile = styled.li`
    min-height: 150px;
    background-color: rgba(255,255,255,0.8);
    list-style-type: none;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const SmallTile = styled.li`
    grid-column: span 2;
    min-height: 100px;
    background-color: #fff;
    border-radius: 10px;
    list-style-type: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const AchievementSelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 80px;
    width: 100%;
    align-items: center;
`