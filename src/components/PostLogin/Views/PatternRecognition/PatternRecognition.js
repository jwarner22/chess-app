import {useState} from 'react'
import Body from "./CoursesBody/CoursesBody";
import styled from "styled-components";
import { MenuTiles } from "../../../UI_Kit/PuzzleMenu/MenuTileElements";
import MenuTile from "../../../UI_Kit/PuzzleMenu/MenuTile";
import MotifMenu from "./MotifMenu/MotifMenu";
import endgameImg from "../../../../Images/kingIconBlue.svg";
import tacticsImg from "../../../../Images/TacticsIconBlue.svg";
import checkmateImg from "../../../../Images/checkmateIconBlue.svg";
import EndgameTiles from './CoursesBody/EngameTiles';
import TacticTiles from './CoursesBody/TacticTiles';
import CheckmateTiles from './CoursesBody/CheckmateTiles';
import FooterBuffer from '../../../UI_Kit/FooterBuffer';





const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <DashboardWrapper>
        <MotifMenu 
        toggle={toggle}
        />
        <PatternRecognitionHeading>Choose a <br></br> <strong>Puzzle to Play</strong></PatternRecognitionHeading>
      <EndgameTiles className="endgameTiles"/>
      <TacticTiles className="tacticTiles"/>
      <CheckmateTiles className="checkmateTiles"/>
    </DashboardWrapper>
    <FooterBuffer />
      </>
  );
};
export default Dashboard;


export const DashboardWrapper =styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #EEF0FF;
`
export const PatternRecognitionHeading = styled.h1`
  font-size: 24px;
  color: #54606c;
  padding: 24px 0px;
  text-align: center;

@media screen and (max-width: 450px) {
  font-size: 18px;
  margin: 18px 0px 24px 0px;
  font-weight: 200;
  opacity: 0.7;
  width: 100%;
}
`

export const PatternRecognitionSubheading = styled.h2`
  font-size: 18px;
  color: #010EFF;
  text-align: center;
  padding: 24px 0px 12px 0px;
  font-weight: 200;
  
  @media screen and (max-width: 450px) {
  font-size: 16px;
  font-weight: 200;
  opacity: 0.7;
  margin: 0px 0px 0px 24px;
  padding-bottom: 12px;

  }
`

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`