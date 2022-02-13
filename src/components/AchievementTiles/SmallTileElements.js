import React from "react"
import styled from "styled-components"

export const SmallTileContainer = styled.li`
    grid-column: span 2;
    min-height: 64px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 25px;
    list-style-type: none;
    box-shadow: 0px 5px 8px rgba(1, 14, 255, 0.25);
    width: 100%;
`
export const SmallTileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 100%;
`
export const SmallTileCategory = styled.div`
    font-size: 12px;
    grid-row: 3;
    text-align: left;
    margin-left: 20px;
`

export const SmallTileValue = styled.div`
    font-size: 16px;
    grid-column: 3;
    grid-row: 2 / span 3;
    padding-right: 12px;
    `

export const ValueDiff = styled.span`
    color: green;
    font-size: 10px;
    vertical-align: top;
`

export const SmallTileContent = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-rows: min-content auto min-content;
    width: 100%;
`
export const SmallTileIconContainer = styled.div`
    align-self: center;
    justify-self: center;
    justify-content: center;
    margin-left: 12px;  
    border-radius: 10px;
    display: flex;
    grid-row: 1 / span 3;
    height: 100%;
`

export const SmallTileIconWrapper = styled.div`
    background:  ${props => {
        if (props.type === 'endgame') return`
            #00a6a6;
            `
        else if (props.type === 'midgame') return`
            #ff5074;
        `
        else if (props.type === 'checkmate') return`
            #7365f1;`
        else return `#F85c37`
    }};;
    display: flex;
    width: 75px;
    height: 75px;
    grid-row: 1 / span 3;
    grid-column: 1;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 8px 15px rgba(1, 14, 255, 0.24);
`

export const SmallTileIcon = styled.img`
    width: 80%;
    height: 80%;
    padding: 4px;
`

export const SmallTileTitle = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 12px
    line-height: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 0px;
    grid-column: 2;
    grid-row: 1/ span 2;
    margin-left: 20px;

`

export const ProgressBarWrapper = styled.div`
    background-color: rgba(255,255,255,0.8);
    margin-top: 8px;
    border-radius: 50px;
    margin-left: 20px;
    margin-right: 8px;
    min-height: 8px;
    grid-column: 2
    grid-row: 2;
`

export const SmallTileDescription = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: flex-end;
    color: #8F8F8F;
    grid-column: 2;
    grid-row: 3;
    margin-left: 20px;
`