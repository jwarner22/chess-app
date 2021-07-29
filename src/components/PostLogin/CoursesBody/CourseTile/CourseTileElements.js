import { FaBook } from 'react-icons/fa'
import styled from 'styled-components'



export const TileWrapper = styled.li`
    border: 1px solid orange;
    list-style-type: none;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgb(86 93 100 / 10%) 0px 0.125rem 1.25rem 0px;
    flex-shrink: 1;
    flex-grow: 1;

    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
    }
`

export const TileHeader = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    grid-template-rows: 60% 40%;
`

export const TileIconWrap = styled.div`
    background: transparent;
    margin-top: 10px;
    margin-left: 15px;
    grid-row: 1 / span 2;
    align-items: center;

    
`

export const TileIcon = styled(FaBook) `
    color: #000;
    width: 60px;
    height: 60px;
`



export const TileHeadline = styled.h3`
    font-size: 1.25rem;
    line-height: 1.1;
    font-weight: 600;
    color: #394149;
    align-self: flex-end;

`

export const TileSubheadline = styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.14;
    display: block;
    color: rgb(112, 118, 124);
`

export const TileDescriptionWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    
`

export const TileDescription = styled.p`
    font-size: 12px;
    font-weight: 400;
`
