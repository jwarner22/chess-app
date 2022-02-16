import styled from "styled-components"

export const PostPuzzleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: #fff;
`
export const PostPuzzleGrid = styled.div`
    max-width: 800px;
    height: auto;
    width: 100%;
    display: flex;
    grid-template-columns: 1fr;
    margin: 0 auto;
    padding: 10px 22px;
    flex-direction: column;
    align-items: center;
`
export const PostPuzzleHeaderImg = styled.img`
    height: 100px;
    width: 100px;
    text-align: center; 
    margin: 10px;
`
export const IconWrap = styled.div`
    background: ${props => {
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
    padding: 20px;
    border-radius: 35px;
    margin: 10px;
    
`
export const RewardH1 = styled.h1`
  color: #54606c;
  text-align: center;
  margin-bottom: 0px;
  margin-top: 10px;
`

export const RewardH2 = styled.h2`
  color: ${({props}) => ((props.failure) ? '#F24F3D' : '#54606c')};
  text-align: center;
  margin-bottom: 20px;
`
export const ModuleExperience = styled.h1`
  color: #54606c;
`

export const FinishButton = styled.button`
    white-space: nowrap;
    padding: 16px 16px;
    margin: 24px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 150px;
    font-weight: 600;
    background: #000DFF;
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgba(1, 14, 255, 0.24);

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #000DFF;
    }

    &:active {
      box-shadow: none;
    }
`
