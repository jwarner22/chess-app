import { FaBook } from 'react-icons/fa'
import styled from 'styled-components'



export const TileWrapper = styled.li`
    /* border: 1px solid orange; */
    list-style-type: none;
    background: linear-gradient(
320deg
, rgb(32, 131, 255), rgba(92, 235, 52, 0)), linear-gradient(rgb(76, 204, 255) 0%, rgb(24, 142, 189) 100%);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    flex-shrink: 1;
    flex-grow: 1;
    height: 200px;
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
    }
`

export const TileHeader = styled.div`
    margin-left: auto;
    margin-right: auto;
`

export const TileIconWrap = styled.div`
    background: transparent;
    padding: 20px;

`

export const TileIcon = styled.img`
    display: block;
    margin: auto;
    width: 90px;
    height: 90px;
`



export const TileHeadline = styled.h3`
    font-size: 1.25rem;
    line-height: 1.1;
    font-weight: 600;
    color: white;
    text-align: center;
    /* padding: 5px; */
    /* margin-top: 5px; */

`

export const TileSubheadline = styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.14;
    color: rgb(112, 118, 124);
    color: white;
    text-align: center;
    padding: 5px;
    margin-top: 5px;

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
    color: white;
    text-align: center;
`
