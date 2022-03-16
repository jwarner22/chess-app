import styled from "styled-components"

export const TileWrapper = styled.li`
    display: flex;
    min-height: 170px;
    /* border: 1px solid orange; */
    list-style-type: none;
    /* background: #247fc1; */
    /* background: linear-gradient(
320deg
, rgb(32, 131, 255), rgba(92, 235, 52, 0)), linear-gradient(rgb(76, 204, 255) 0%, rgb(24, 142, 189) 100%); */
    border-radius: 35px;
    /* flex-shrink: 1;
    flex-grow: 1; */
    transition: all 0.2s ease-in-out;
    background: #7365f1;
    ${props => {
        if (props.type === 'endgame') return`
            background: #00a6a6;
            `
        else if (props.type === 'midgame') return`
        background: #ff5074;
        `
        else return `background: #7F3AD4`
    }};
    box-shadow: 0px 8px 15px rgba(1, 14, 255, 0.24);
    `

export const TileHeader = styled.div`
    padding: 2px;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${props => props.current ? '#243862' : '#fff'};
    align-items: center;
    justify-content: space-evenly;
`

export const TileIconWrap = styled.div`
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
    color: #fff;
    text-align: center;
    /* margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 2px; */
    padding: 8px;
    text-decoration: none;
    /* margin-top: 5px; */
    @media screen and (max-width: 768px) {
        margin-top: 8px;
        font-size: 12px;
        padding: 0 8px;
         }
 `

 export const OpeningTileHeadline = styled.h3`
    font-size: 1.25rem;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
    text-align: center;
    /* margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 2px; */
    padding: 8px;
    margin-top: 8px;
    text-decoration: none;
    /* margin-top: 5px; */
    @media screen and (max-width: 768px) {
        margin-top: 24px;
        margin-bottom: 16px;
        font-size: 12px;
        padding: 0 8px;
         }
 `

 export const OpeningTileSubheadline = styled.p`
 font-size: 1rem;
 font-weight: 400;
 line-height: 1.14;
 color: ${props => props.current ? '#243862' : '#fff'};
 text-align: center;
 margin-bottom: 8px;

 @media screen and (max-width: 768px) {
     /* display: none; */
     /* margin-bottom: 24px; */
     /* padding: 12px 8px; */
     /*padding-top: 8px; */
     font-size: 12px;
 }
`

export const TileSubheadline = styled.p`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.14;
    color: ${props => props.current ? '#243862' : '#fff'};
    text-align: center;
    margin-bottom: 10px;

    @media screen and (max-width: 768px) {
        /* display: none; */
        /* margin-bottom: 24px; */
        padding: 12px 8px;
        font-size: 10px;
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
    align-items: center;
    height: 100%;
    padding: 4px 10px 10px 10px;
    grid-template-columns: 1fr 1fr;
    margin-left: 10px;


    @media screen and (max-height: 640px) {
        display: none;
    }
`

export const TileButton = styled.div`
    color: #7365f1;
    ${props => {
        if (props.type === 'endgame') return`
            color: #00a6a6;
            `
        else if (props.type === 'midgame') return`
            color: #ff5074;
        `
    }}
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

//Current Tile Divs
export const CurrentHeadlineWrapper = styled.div`
    display: flex;
    background: #FF8B59;
    justify-content: center;
    border-radius: 35px 0px 0px 35px;
    align-items: center;
    text-align: center;
    flex-direction: column;
    max-width: 40%;
`

export const TileContent = styled.div`
    width: 50%;
`

export const CurrentOpeningContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 0 24px 0 24px;
    justify-content: center;
`