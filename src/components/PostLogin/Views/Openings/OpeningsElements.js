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
    grid-template-columns: repeat(auto-fit, minmax(100px, 240px)minmax(100px, 240px));
    grid-gap: 36px;
    justify-content: space-around;
    background: #EEF0FF;
    align-items: stretch;
`

export const OpeningsTileContainer = styled.li`
    display: flex;
    min-height: 170px;
    list-style-type: none;
    background: linear-gradient(360deg, #8E2DE2 0%, #4A00E0 100%);
    border-radius: 35px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 8px 15px rgba(1, 14, 255, 0.24);
    
`
export const OpeningsTileLeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
`
export const OpeningTileHeadline = styled.h3`
    font-size: 1.25rem;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
    text-align: left;
    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 2px;
    padding-left: 8px;
    /* margin-top: 5px; */
    @media screen and (max-width: 768px) {
        margin-top: 8px;
        font-size: 12px;
        padding: 0 8px;
         }
 `

 export const OpeningTileSubheadline = styled.p`
     font-size: 1rem;
    font-weight: 400;
    line-height: 1.14;
    color: #fff;
    text-align: left;
    margin-bottom: 10px;
    padding-left: 8px;
    margin-left: 10px;

    @media screen and (max-width: 768px) {
        padding: 0 8px;
        font-size: 10px;
    }
 `

export const OpeningTileButtonWrapper = styled.div`
    display: grid;
    align-items: center;
    height: 100%;
    padding: 4px 10px 10px 10px;
    grid-template-columns: 1fr 1fr;
    margin-left: 10px;


    @media screen and (max-height: 640px) {
        display: none;
    }
`

 export const OpeningTileButton = styled.div`
     color: #8E2DE2;
    background: #fff;
    border-radius: 16px;
    white-space: nowrap;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-height: 36px;
    min-width: 50%;

    &:hover {
        box-shadow: 0.2s ease-in-out;
        color: #fff;
        transform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

    @media screen and (max-height: 640px) {
        display: none;
    }
 `

export const OpeningsTileRightColumn = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`

export const OpeningImgWrapper = styled.div`
    padding: 20px;
    margin: 4px;
`

export const OpeningsTileImage = styled.img`
    display: block;
    margin: auto;
    width: 70px;
    height: 70px;
`



//Placeholder page elements

// export const OpeningPageImgContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     min-height: 100vh;
// `

// export const OpeningPageImgWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     padding: 24px 8px;
//     margin: 24px 8px;
// `

// export const OpeningsPagePlaceholderImg = styled.img`
//     max-width: 70%;
//     height: auto;
//     padding-top: 16px;
//     margin: 16px;
// `

// export const OpeningsTitle = styled.h1`
//     color: #247cf1;
//     padding: 16px;
//     margin: 8px;
//     text-align: center;
// `
