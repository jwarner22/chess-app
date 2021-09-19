import React from "react"
import styled from "styled-components"

export const AchievementTileContainer = styled.div`
    display: hidden;
`

export const AchievementTileWrapper = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 16px;
    grid-gap: 16px;
`
export const LargeTile = styled.li`
    min-height: 150px;
    background-color: #fff;
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