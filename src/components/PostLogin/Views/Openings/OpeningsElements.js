import React from 'react'
import styled from "styled-components"

export const OpeningsTitleContainer = styled.div`
    display: flex;
    min-height: 80px; 
    background: #7F3AD4;
    justify-content: flex-start;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    justify-content: center;
    width: 100vw;
    position: sticky;
    top: 0px; 
    color: #fff;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    z-index: 9999;
`

export const OpeningsGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 300px));
    grid-gap: 24px;
    justify-content: space-around;
`

export const OpeningsTileContainer = styled.li`
    display: grid;
    min-height: 100%;
    list-style-type: none;
    background: #ece4ff;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.12);
    grid-template-columns: 70% 1fr;
`
export const OpeningsTileLeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1;
    justify-content: space-around;
    padding: 16px;

`
export const OpeningTileHeadline = styled.h3`
    font-size: 1.15rem;
    line-height: 1.1;
    font-weight: 600;
    color: #7F3AD4;
    text-align: left;
    @media screen and (max-width: 768px) {
        font-size: 1.2rem }
 `

export const OpeningTileButtonWrapper = styled.div`
    display: flex;
`

 export const OpeningTileButton = styled.button`
    color: #212121;
    background: #fff;
    border-radius: 10px;
    white-space: nowrap;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    padding: 12px 32px 12px 32px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

    &:hover {
        box-shadow: 0.2s ease-in-out;
        color: #fff;
        transform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }
 `

export const OpeningsTileRightColumn = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`

export const OpeningsTileImage = styled.img`
    width: 100px;
    position: relative;
    top: 20px;
`



//Placeholder page elements

export const OpeningPageImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const OpeningPageImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 8px;
    margin: 24px 8px;
`

export const OpeningsPagePlaceholderImg = styled.img`
    max-width: 70%;
    height: auto;
    padding-top: 16px;
    margin: 16px;
`

export const OpeningsTitle = styled.h1`
    color: #247cf1;
    padding: 16px;
    margin: 8px;
    text-align: center;
`
