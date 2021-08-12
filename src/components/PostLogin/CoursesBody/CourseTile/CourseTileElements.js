import { FaBook } from 'react-icons/fa'
import styled from 'styled-components'



export const TileWrapper = styled.li`
    /* border: 1px solid orange; */
    list-style-type: none;
    background: #fff;
    /* background: #247fc1; */
    /* background: linear-gradient(
320deg
, rgb(32, 131, 255), rgba(92, 235, 52, 0)), linear-gradient(rgb(76, 204, 255) 0%, rgb(24, 142, 189) 100%); */
    border-radius: 10px;
    box-shadow: rgba(36, 124, 241, 0.2) 0px 3px 8px;
    flex-shrink: 1;
    flex-grow: 1;
    height: 200px;
    transition: all 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }
`

export const TileHeader = styled.div`
    padding: 2px;
`

export const TileIconWrap = styled.div`
    background: #247cf1;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    
`

export const TileIcon = styled.img`
    display: block;
    margin: auto;
    width: 70px;
    height: 70px;
`



export const TileHeadline = styled.h3`
    font-size: 1.25rem;
    line-height: 1.1;
    font-weight: 600;
    color: #54606c;
    text-align: center;
    margin-top: 12px;
    margin-bottom: 8px;
    /* padding: 5px; */
    /* margin-top: 5px; */

`

export const TileSubheadline = styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.14;
    color: rgb(112, 118, 124);
    color: #54606c;
    text-align: center;
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
