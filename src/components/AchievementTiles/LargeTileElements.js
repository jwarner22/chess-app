import React from "react"
import styled from "styled-components" 


export const StatContainer = styled.li`
    height: auto;
    background-color: rgba(255,255,255,0.8);
    list-style-type: none;
    border-radius: 15px;
    box-shadow: 0px 5px 8px rgba(1, 14, 255, 0.25);
`

export const StatWrapper = styled.div`
    display: flex;
    padding: 12px;
    height: 100%;
    justify-content: flex-start;
    width: 100%;
`

export const StatImage = styled.img`
    max-height: 30px;
    max-width: 30px;
    display: inline-block;
`

export const StatContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const StatTitle = styled.h3`
    font-size: 12px;
    font-weight: 400;
    opacity: 70%;
`

export const Stat = styled.h2`
    font-size: 24px;
    font-weight: 600;
    opacity: 70%;
`

// export const LargeTileContainer = styled.li`
//     min-height: 150px;
//     background-color: rgba(255,255,255,0.8);
//     list-style-type: none;
//     border-radius: 10px;
//     box-shadow: 0px 5px 8px rgba(1, 14, 255, 0.25);
// `
// export const LargeTileWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 8px;
//     height: 100%;
//     `
export const LargeTileContent = styled.div`
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr min-content;
    width: 100%;
`

export const LargeTileIconWrapper = styled.div`
    display: flex;
    border-radius: 50%;
     min-width: 60px;
     min-height: 60px;
    background: rgba(89, 189, 42, 0.2);
    grid-row: 1;
    grid-column: 1;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`

export const TileIcon = styled.img` 
    max-height: 45px;
    max-width: 45px;
`

export const LargeTileTitle = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    margin-left: 8px;
`

export const LargeTileData = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    display: flex;
    align-items: center;
    text-align: center;
    grid-column: 1 / span 2;
    justify-content: center;
    color: #59BD2A;
    margin: 8px;
`

export const LargeTileTip = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    color: #8F8F8F;
    grid-column: 1 / span 2;
    justify-content: center;
    padding: 4px;
`