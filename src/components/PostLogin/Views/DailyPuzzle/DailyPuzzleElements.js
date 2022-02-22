import styled from "styled-components"

export const Container = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #EEF0FF;
`

export const DailyPuzzleWrapper = styled.div`
    padding-top: 20px;
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
    max-width: 150px;
    max-height: 150px;
    justify-self: center;
    grid-column: 1 / span 2;
    margin-bottom: 20px;
`

export const DailyPuzzleTitle = styled.h1`
    color: #243862;
    text-align: center;
    grid-column: 1 / span 2;
`

export const DailyPuzzleModuleStyle = styled.div`
    margin: 16px 32px;
    background: ${props => {
        if (props.locked) return`
        rgba(218, 218, 218, 1)
        `
        else if (props.type === 'endgame') return`
            #00a6a6;
            `
        else if (props.type === 'midgame') return`
            #ff5074;
        `
        else if (props.type === 'checkmate') return`
            #7365f1;`
        else return `
        #F85c37`
    }};
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    border-radius: 35px;
    box-shadow: ${props => props.locked ? 'rgba(1, 14, 255, 0.24) 0px 8px 15px' : "rgba(1, 14, 255, 0.24) 0px 8px 15px" };
    transition: all 0.2s ease-in-out;
    max-width: 800px;
    grid-gap: 8px;
    grid-template-rows: min-content min-content;
    z-index: 999;
    position: relative;


    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.01);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
    }

    @media screen and (max-width: 425px) {
        grid-template-rows: 1fr;
        grid-gap: 8px;
        }
`

export const DailyPuzzleIconWrapper = styled.div`
    display: flex;
    grid-row: span 2;
    grid-column: 1;
    text-align: center;
    border-radius: 10px;
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
    margin: 1rem 8px 1rem 1rem;

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
    color: #fff;
    grid-column: 2;
    font-size: 16px;
`

export const PuzzleDescripton = styled.p`
    text-align: left;
    color: #fff;
    grid-column: 2;
    margin: 0 8px 8px 0;

    @media screen and (max-width: 425px) {
        display: none;
        
        }
`
export const PuzzleWrapper = styled.div`
    display: flex; 
    flex-direction: column;

    @media screen and (max-width: 640px){
        flex-direction: column-reverse;
    }
`

export const SelectionContainer = styled.div`
    display: flex;
    padding-bottom: 40px;

    @media screen and (max-width: 425px) {
        padding-bottom: 80px;
    }
`

export const GeneratingTrainingContainer = styled.div`
    display: flex;
    height: calc(100vh - 80px);
    justify-content: center;
    align-items: center; 
    flex-direction: column;
`

export const ProgressBarContainer = styled.div`
    position: relative;
    transform: rotate(90deg);
    align-items: center;
    bottom: -50%;
    left: -29%;
    z-index: 1;

    @media screen and (max-width: 640px) {
        bottom: 50%;
        transform: rotate(270deg);
    }
`