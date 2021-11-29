import styled from 'styled-components'



export const TileWrapper = styled.li`
    display: flex;
    min-height: 100%;
    /* border: 1px solid orange; */
    list-style-type: none;
    background: #fff;
    /* background: #247fc1; */
    /* background: linear-gradient(
320deg
, rgb(32, 131, 255), rgba(92, 235, 52, 0)), linear-gradient(rgb(76, 204, 255) 0%, rgb(24, 142, 189) 100%); */
    border-radius: 10px;
    /* flex-shrink: 1;
    flex-grow: 1; */
    transition: all 0.2s ease-in-out;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    `


export const TileHeader = styled.div`
    padding: 2px;
    display: flex;
    flex-direction: column;
    min-width: 100%;
`

export const TileIconWrap = styled.div`
    background-image: linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%);
    padding: 20px;
    border-radius: 10px;
    margin: 4px;
    
`

export const TileIconImg = styled.img`
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
    text-align: left;
    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 2px;
    /* margin-top: 5px; */
    @media screen and (max-width: 768px) {
        margin-top: 8px;
        margin-bottom: 16px;
        font-size: 1rem }
 `

export const TileSubheadline = styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.14;
    color: rgb(112, 118, 124);
    color: #54606c;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 10px;
    padding: 2px;
    margin-left: 10px;


    @media screen and (max-width: 768px) {
        display: none;
    }
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
export const TileButtonWrap = styled.div`
    display: grid;
    align-items: flex-end;
    height: 100%;
    padding: 4px 10px 10px 10px;
    grid-template-columns: 1fr 1fr;


    @media screen and (max-height: 640px) {
        display: none;
    }
`

export const TileButton = styled.div`
    color: #fff;
    background: #000DFF;
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

export const InfoModalWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const InfoModalIcon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    justify-content: flex-end;
    z-index: 5555;
    position: relative;
`

