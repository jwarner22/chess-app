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

export const RewardH1 = styled.h1`
  color: #54606c;
  text-align: center;
  margin-bottom: 0px;
  margin-top: 10px;
`

export const RewardH2 = styled.h2`
  color: #54606c;
  text-align: center;
  margin-bottom: 20px;
`
export const ModuleExperience = styled.h1`
  color: #54606c;
`

export const FinishButton = styled.button`
  border-radius: 50px;
    background: #247cf1;
    white-space: nowrap;
    padding: 10px 22px;
    margin: 30px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    grid-column: 1 / span 2;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

    &:active {
      box-shadow: none;
    }
`