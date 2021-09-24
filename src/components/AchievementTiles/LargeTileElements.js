import React from "react"
import styled from "styled-components"


export const LargeTileContainer = styled.li`
    min-height: 150px;
    background-color: #fff;
    list-style-type: none;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const LargeTileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 100%;
    `
export const LargeTileContent = styled.div`
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr min-content;
    width: 100%;
`

export const LargeTileIconWrapper = styled.div`
    border-radius: 50%;
     min-width: 47px;
     min-height: 47px;
    background: rgba(89, 189, 42, 0.2);
    grid-row: 1;
    grid-column: 1;
    border-radius: 50px;
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