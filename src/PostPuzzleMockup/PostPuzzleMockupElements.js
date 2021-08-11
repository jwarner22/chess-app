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
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 auto;
    padding: 10px 22px;
`
export const PostPuzzleHeaderImg = styled.img`
    max-height: 100px;
    max-width: 100px;
    text-align: center; 
`