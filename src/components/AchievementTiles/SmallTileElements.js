import React from "react"
import styled from "styled-components"

export const SmallTileContainer = styled.li`
    grid-column: span 2;
    min-height: 64px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 10px;
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

export const SmallTileContent = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-rows: min-content auto min-content;
    width: 100%;
`
export const SmallTileIconContainer = styled.div`
    border-radius: 10px;
    display: flex;
    align-self: center;
    justify-self: center;
    justify-content: center;
    grid-row: 1 / span 3;
    height: 100%;
`

export const SmallTileIconWrapper = styled.div`
    background: linear-gradient(143.66deg, #000DFF 21.19%, #6B73FF 78.81%);
    display: flex;
    border-radius: 50%;
    min-width: 60px;
    min-height: 60px;
    max-width: 60px;
    max-height: 60px;
    grid-row: 1 / span 3;
    grid-column: 1;
    border-radius: 10px;
    align-self: center;
    justify-self: center;
`

export const SmallTileIcon = styled.img`
    max-width: 60px;
    min-width: 60px;
    padding: 4px;
`

export const SmallTileTitle = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: ${({category}) => ((category==='perfect') ? '14px' : '12px')};
    line-height: 14px;
    display: flex;
    align-items: center;
    margin-bottom: ${({category}) => ((category==='perfect') ? '12px' : '0px')};
    grid-column: 2;
    grid-row: ${({category}) => ((category==='perfect') ? 2 : 1)};
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