import styled from 'styled-components'
import { Link as LinkS } from "react-scroll"

export const MenuWrapper = styled.div`
    display: flex;
    width: 100%;
    /* padding: 0 24px; */
    background: #EEF0FF;
    overflow: hidden;
    padding-top: 12px;
    justify-content: center;
`
export const MenuGrid = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 24px;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
    -ms-overflow-style: none;
    padding: 0 24px 12px 24px;
`

export const TileWrapper = styled.li`
    list-style-type: none;
`

export const MenuTiles = styled(LinkS)`
    display: flex;
    width: 110px;
    height: 70px;
    background: ${({testBackground}) => (testBackground ? "red" : "#fff")}
    border: 1px solid #010EFF;
    box-shadow: 0px 5px 8px rgba(1, 14, 255, 0.25);
    border-radius: 25px;
    list-style-type: none;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #247cf1;
    }

    &.hover{
        transition: all 0.2s ease-in-out;
        color: #247cf1;
    }

`
export const MenuContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const MenuImg = styled.img`
    width: 35%;
    padding-top: 8px;
`

export const MenuTitle = styled.span`
    font-size: 10px;
    color: #010EFF;
    padding: 8px 0;
`