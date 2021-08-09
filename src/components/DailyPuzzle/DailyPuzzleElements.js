import styled from "styled-components"

export const DailyPuzzleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: #f3f3f3;
`
export const DailyPuzzleContainer = styled.div`
    max-width: 800px;
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 auto;
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
    margin: 10px;
    background-color: white;
    padding: 10px;
    display: grid;
    grid-template-columns: 30% 1fr;
    border-radius: 10px;
    box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0.2s ease-in-out;
        transform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
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