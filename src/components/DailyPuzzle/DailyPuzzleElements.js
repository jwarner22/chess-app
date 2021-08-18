import styled from "styled-components"

export const Container = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #f6f9fc;
`

export const DailyPuzzleWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
`

export const DailyPuzzleContainer = styled.div`
    max-width: 800px;
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    padding: 10px 22px;
`

export const DailyPuzzleHeaderImg = styled.img`
    max-width: 90px;
    max-height: 90px;
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
    margin: 20px auto;
    background-color: ${({props}) => (props.locked ? 'gray' : 'white')};
    padding: 10px;
    display: grid;
    grid-template-columns: 30% 1fr;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    transition: all 0.2s ease-in-out;
    max-width: 800px;
    min-width: 800px;


    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.01);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }
`

export const DailyPuzzleIconWrapper = styled.div`
    background: #247cf1;
    grid-row: span 2;
    grid-column: 1;
    text-align: center;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export const DailyPuzzleIcon = styled.img`
    width: 90px;
    height: 90px;
    grid-row: span 2;
    grid-column: 1;
    margin: 1rem;
`

export const PuzzleModuleTitle = styled.h2`
    text-align: left;
    color: #333;
    grid-column: 2;
    margin-top: 15px;
    margin-left: 15px;
`

export const PuzzleDescripton = styled.p`
    text-align: left;
    color: #333;
    grid-column: 2;
    margin-bottom: 15px;
    margin-left: 15px;
`
export const PuzzleWrapper = styled.div`
    display: block; 
    max-width: 800px;
    flex-wrap: flex;
`