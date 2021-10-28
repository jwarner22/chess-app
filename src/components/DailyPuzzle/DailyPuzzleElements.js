import styled from "styled-components"

export const Container = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #F3F5F9;
`

export const DailyPuzzleWrapper = styled.div`
    padding-top: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

`

export const DailyPuzzleContainer = styled.div`
    height: auto;
    display: grid;
    grid-template-columns: minmax(100px, 800px);
    margin: 16px 32px;
`

export const DailyPuzzleHeaderImg = styled.img`
    max-width: 90px;
    max-height: 90px;
    width: 90px;
    height: 90px;
    justify-self: center;
    grid-column: 1 / span 2;
    margin-bottom: 20px;
`

export const DailyPuzzleTitle = styled.h1`
    color: #247cf1;
    text-align: center;
    grid-column: 1 / span 2;
`

export const DailyPuzzleModuleStyle = styled.div`
    margin: 16px 32px ;
    background-color: ${({props}) => ((props.locked && !props.completed) ? 'gray' : 'white')};
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    border-radius: 10px;
    box-shadow: ${({props}) => (props.completed ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px;' : 'rgba(149, 157, 165, 0.2) 0px 8px 24px;')};
    transition: all 0.2s ease-in-out;
    max-width: 800px;
    grid-gap: 8px;
    grid-template-rows: min-content min-content;


    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.01);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

    @media screen and (max-width: 425px) {
        grid-template-rows: 1fr;
        grid-gap: 8px;
        }
`

export const DailyPuzzleIconWrapper = styled.div`
    display: flex;
    background-image: linear-gradient(to right bottom, #247cf1, #1464e4, #164bd5, #232fc3, #2f00af);
    grid-row: span 2;
    grid-column: 1;
    text-align: center;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 4px;
    align-items: center;
`

export const DailyPuzzleIcon = styled.img`
    max-width: 90px;
    max-height: 90px;
    width: 90px;
    height: 90px;
    grid-row: span 2;
    grid-column: 1;
    margin: 1rem;

    @media screen and (max-width: 425px) {
        grid-row: 1;
        width: 60px;
        height: 60px;
        }
`

export const Col2Row1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-column: 3;
    grid-row: 1;
    padding: ${({props}) => ((props.completed) ? '4px 12px 0px 0px;' : '4px 12px 0px 0px')};
`

export const CompletedCheck = styled.img`
    max-height: 30px;
    max-width: 30px;
`

export const Col2Row2 = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    grid-column: 2;
    grid-row: 1;

    @media screen and (max-width: 425px) {
        align-items: center;
        justify-content: flex-start;
    }
`
export const Col2Row3 = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    grid-column: 2;
    grid-row: 2;

    @media screen and (max-width: 425px) {
        align-items: center;
        justify-content: flex-start;
    }
`
export const PuzzleModuleTitle = styled.h2`
    text-align: left;
    color: #333;
    grid-column: 2;
`

export const PuzzleDescripton = styled.p`
    text-align: left;
    color: #333;
    grid-column: 2;
    margin: 0 8px 8px 0;

    @media screen and (max-width: 425px) {
        display: none;
        
        }
`
export const PuzzleWrapper = styled.div`
    display: block; 
    flex-wrap: flex;
`