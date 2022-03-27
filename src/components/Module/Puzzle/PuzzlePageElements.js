import styled from "styled-components";

export const progressContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: 24,
  paddingBottom: 24,
  width: "80%",
  margin: "auto"
};

export const PercentCompleted = styled.div`
  position: absolute;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
`;
export const Header = styled.h2`
  color: rgba(255,255,255,0.8);
  text-align: center;
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

export const PuzzlePageContainer = styled.div`
    bottom: 0;
    left: 0;
    right: 0;
    top: 0; 
    position: absolute;
    height: 100%;
    background-image: linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%);
`;
export const PuzzlePageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const PuzzlePageGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    max-width: 1080px;
    grid-gap: 16px;
    padding: 80px 16px 0px 16px;
    justify-content: center;
    grid-template-rows: minmax(300px, auto);
    align-items: center;
  /* @media screen and (max-width: 900px){
    grid-template-columns: minmax(250px, 600px);
    flex-direction: column;
    grid-template-rows: min-content;
    align-items: center;
    padding: 60px 4px 0px 4px; */
  `;

export const PuzzleBoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1;
    /* position: relative; */


  @media screen and (max-width: 900px){

  }
`;

export const PuzzleBoardWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 24px 0px;
    height: minmax(300px, auto);
`;

export const RightPuzzlePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 2;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    height: auto;
    min-width: 300px;
    justify-content: center;
    padding-top: 60px;

    /* @media screen and (max-width: 900px){
    grid-column: 1;
  } */
`;
export const IndicatorWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
export const TimerAndLivesContainer = styled.div`
  display: flex;
  width: 100%;
`;
