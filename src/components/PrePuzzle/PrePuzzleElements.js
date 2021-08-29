import React from 'react'
import styled from "styled-components"
import { GoSearch } from "react-icons/go";

export const PuzzlePageContainer = styled.div`
   min-height: 692px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background-color: #f6f8f9;
  height: 100vh;
`
export const PrePuzzleIconWrapper = styled.div`
    background: #247cf1;
    text-align: center;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-bottom: 3px;
`
export const PrePuzzleWrapper = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 70%;
    margin: 0 auto;
    align-items: center;
    background-color: white;
    margin-top: 24px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`



export const PrePuzzleTitle = styled.h1`
    text-align: center;
    padding-bottom: 4px;
    padding-top: 16px;
    color: #54606c;
    margin: 24px 24px 0 24px;
`

export const PrePuzzleSubheading = styled.h2`
    text-align: center;
    padding: 4px;
    color: #54606c;
    margin: 0 0 40px 0;
`

export const PrePuzzleContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const StatsWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 40%;
`

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const LeftStatWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const PuzzleEloTitle = styled.h1`
    text-align: center;
    grid-column: 1;
    font-size: 1rem;
    color: #247cf1;
`

export const PuzzleElo = styled.h1`
    text-align: center;
    grid-column: 1;
    color: #54606c;
`

export const HighScoreTitle = styled.h1`
    text-align: center;
    grid-column: 2;
    font-size: 1rem;
    grid-row: 1;
    color: #247cf1;
`

export const HighScore = styled.h1`
    text-align: center;
    grid-column: 2; 
    grid-row: 2;
    color: #54606c;
`
export const InstructionsContainer = styled.div`
    display: flex;
    width: 100vw;
    /* border: 2px solid blue; */
    align-items: center;
    flex-direction: column;
`

export const InstructionsWrapper = styled.div`
    width: 70%;
    /* border: 2px solid red; */
    height: 100%;
    padding: 24px;
    margin: 24px;
`
export const TipsTitleWrapper = styled.div`
    margin-left: 24px;
`

export const TipsTitle = styled.h2`
    font-weight: 400;
    color: #54606c;
    
`
export const TipsGrid = styled.div`
    display: grid;
    grid-template-columns: 15% 1fr;
`

export const TipImageWrap = styled.div`
    margin: 24px;
    display: flex;
`

export const Tip1Image = styled(GoSearch) `
    color: #247cf1;
    min-height: 60px;
    min-width: 60px;
    grid-column: 1;
`

export const TipDescriptionWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const Tip1Description = styled.h3`
    font-size: 24px;
    font-weight: 600;
    color: #54606c;
`
