import styled from "styled-components"
import { GoSearch } from "@react-icons/all-files/go/GoSearch";

export const PuzzlePageContainer = styled.div`
   min-height: 692px;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background-color: #EEF0FF;
  height: 100vh;
`
export const PrePuzzleIconWrapper = styled.div`
    background:${props => {
        if (props.type === 'endgame') return`
            #00a6a6;
            `
        else if (props.type === 'midgame') return`
            #ff5074;
        `
        else if (props.type === 'checkmate') return`
            #7365f1;`
        else return `#F85c37`
    }};
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-bottom: 3px;
`

export const PrePuzzleTileContainer = styled.div`
    display: flex;
    min-width: 100%;
    justify-content: center;
    align-items: center;
`

export const PrePuzzleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    min-width: 300px;
    margin: 0 auto;
    align-items: center;
    background-color: white;
    margin-top: 50px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 10px;
`



export const PrePuzzleTitle = styled.h1`
    text-align: center;
    padding-bottom: 4px;
    padding-top: 16px;
    color: #54606c;
    margin: 8px 24px 0 8px;
`

export const PrePuzzleSubheading = styled.h2`
    text-align: center;
    padding: 4px;
    color: #54606c;
    margin: 0 0 8px 0;
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
    min-width: 300px;
    justify-content: center;
    align-items: center; 
    border-top: 2px rgb(122,150,191) solid;
`
export const LeftStatWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-right: 1px rgb(122,150,191) solid;
    height: 100%;
    width: 100%;

`

export const RightStatWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-left: 1px rgb(122,150,191) solid;
    grid-column: 2;
    grid-row: 1;
    height: 100%;
    width: 100%;
`

export const PuzzleEloTitle = styled.h1`
    text-align: center;
    grid-column: 1;
    font-size: 1rem;
    color: ${props => {
        if (props.type === 'endgame') return`
            #00a6a6;
            `
        else if (props.type === 'midgame') return`
            #ff5074;
        `
        else if (props.type === 'checkmate') return`
            #7365f1;`
        else return `#F85c37`
    }};
    padding: 4px 8px;
    margin: 4px 8px;
`

export const PuzzleElo = styled.h1`
    text-align: center;
    grid-column: 1;
    color: #54606c;
`

export const HighScoreTitle = styled.h1`
    text-align: center;
    font-size: 1rem;
    grid-row: 1;
    color: ${props => {
        if (props.type === 'endgame') return`
            #00a6a6;
            `
        else if (props.type === 'midgame') return`
            #ff5074;
        `
        else if (props.type === 'checkmate') return`
            #7365f1;`
        else return `#F85c37`
    }};
    padding: 4px 8px;
    margin: 4px 8px;
`

export const HighScore = styled.h1`
    text-align: center;
    grid-column: 2; 
    grid-row: 2;
    color: #54606c;
`
export const InstructionsContainer = styled.div`
    display: flex;
    max-width: 1140px;
    /* border: 2px solid blue; */
    align-items: center;
`

export const InstructionsWrapper = styled.div`
    /* width: 100%; */
    /* border: 2px solid red; */
    height: 100%;
    padding: 8px 8px 0px 8px;
    margin: 8px 8px 0px 8px;
    min-width: 300px;
    max-width: 85%;
`
export const TipsTitleWrapper = styled.div`
    margin: 16px;
`

export const TipsTitle = styled.h2`
    font-weight: 600;
    color: #54606c;

    @media screen and (max-width: 640px) {
        text-align: center;
    }
    
`
export const TipsGrid = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr;
    width: 100%;
`

export const TipImageWrap = styled.div`
    padding: 24px;
    display: flex;
    justify-content: center;
`

export const Tip1Image = styled(GoSearch) `
    color: rgb(122,150,191);
    min-height: 40px;
    min-width: 40px;
    grid-column: 1;
`

export const TipDescriptionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Tip1Description = styled.p`
    font-size: 18px;
    color: #54606c;

    @media screen and (max-width: 768px)  {
        font-size: 16px;
    }
`