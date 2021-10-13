import React from "react"
import styled from "styled-components"

export const SmallTileContainer = styled.li`
    grid-column: span 2;
    min-height: 64px;
    background-color: #fff;
    border-radius: 10px;
    list-style-type: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    max-width: 1080px;
`
export const SmallTileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 100%;
`

export const SmallTileContent = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-rows: min-content auto min-content;
    width: 100%;
`
export const SmallTileIconContainer = styled.div`
    display: flex;
    align-self: center;
    justify-self: center;
    grid-row: 1 / span 3;
    height: 100%;
    background-image: linear-gradient(to right bottom, #247cf1, #1464e4, #164bd5, #232fc3, #2f00af);
`

export const SmallTileIconWrapper = styled.div`
    background-image: linear-gradient(to right bottom, #247cf1, #1464e4, #164bd5, #232fc3, #2f00af);    
    display: flex;
    border-radius: 50%;
    min-width: 60px;
    min-height: 60px;
    grid-row: 1 / span 3;
    grid-column: 1;
    border-radius: 10px;
    align-self: center;
    justify-self: center;
`

export const SmallTileTitle = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: flex-start;
    grid-column: 2;
    grid-row: 1;
    margin-left: 20px;

`

export const ProgressBarWrapper = styled.div`
    background: #FFFFFF;
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
    margin-left: 20px;
`