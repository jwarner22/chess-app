import React from "react"
import styled from "styled-components"

export const PromoModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`

export const PromoModalWrapper = styled.div`
    width: 150px;
    height: 150px;
    display: grid;
    background: #247cf1;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`

export const PromoQueenWrapper = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    grid-row: 1;
    grid-column: 1;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
    }
`

export const PromoQueenImg = styled.img`
    width: 100%;
    height: 100%;
    padding: 10px;
`
export const PromoRookWrapper = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    grid-row: 1;
    grid-column: 2;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
    }
`

export const PromoRookImg = styled.img`
    width: 100%;
    height: 100%;
    padding: 10px;
`

export const PromoBishopWrapper = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    grid-row: 2;
    grid-column: 1;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
    }
`

export const PromoBishopImg = styled.img`
    width: 100%;
    height: 100%;
    padding: 10px;
`
export const PromoKnightWrapper = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    grid-row: 2;
    grid-column: 2;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
    }
`
export const PromoKnightImg = styled.img`
    width: 100%;
    height: 100%;
    padding: 10px;
`
