import styled from "styled-components"

export const DailyPuzzleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center; 
`
export const DailyPuzzleContainer = styled.div`
    max-width: 800px;
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    padding: 10px 22px;
`
export const DailyPuzzleTitle = styled.h1`
    color: #247cf1;
    text-align: center;
    grid-column: 1 / span 2;
`
