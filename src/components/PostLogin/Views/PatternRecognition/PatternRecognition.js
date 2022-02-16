import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from "styled-components";
import MotifMenu from "./MotifMenu/MotifMenu";
import EndgameTiles from './CoursesBody/EngameTiles';
import TacticTiles from './CoursesBody/TacticTiles';
import CheckmateTiles from './CoursesBody/CheckmateTiles';
import FooterBuffer from '../../../UI_Kit/FooterBuffer';
import Button from '../../../UI_Kit/Button/Button';
import {Modules} from './CourseTiles/Data';
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import CourseTile from './CourseTiles/CourseTiles';


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const endgameModules = Modules.filter(module => module.type === "endgame")
  const tacticModules = Modules.filter(module => module.type === "midgame")
  const checkmateModules = Modules.filter(module => module.type === "checkmate")

  console.log(Modules.type)
  
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    let loadTimeout = setTimeout(() => setVisible(true),30);
    return () => clearTimeout(loadTimeout);
  },[])

  return (
    <>
    {/* <Link to="/feature_suggestion">
    <FeatureSuggestionButton primary>
      Suggest a Feature
    </FeatureSuggestionButton>
    </Link> */}
    <DashboardWrapper>
        <MotifMenu 
        toggle={toggle}
        />
      <PuzzleTileGrid className="endgameTiles" id={"endgames"} category={"Endgames"}>
        {endgameModules.map((module, index) => {
                          return(
                          // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                          <CourseTile key={index} {...module} />
                          // </ModalLink>
                      )})}
      </PuzzleTileGrid>
      {visible && <>
      <PuzzleTileGrid className="tacticTiles" id={"tactics"} category={"Tactics"}>
        {tacticModules.map((module, index) => {
                          return(
                          // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                          <CourseTile key={index} {...module} />
                          // </ModalLink>
                      )})}
      </PuzzleTileGrid>
      <PuzzleTileGrid className="checkmateTiles" id={"checkmates"} category={"Checkmates"}>
        {checkmateModules.map((module, index) => {
                          return(
                          // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                          <CourseTile key={index} {...module} />
                          // </ModalLink>
                      )})}
      </PuzzleTileGrid>
      </>}
    </DashboardWrapper>
    <FooterBuffer />
      </>
  );
};
export default Dashboard;

export const FeatureSuggestionButton = styled(Button)`
  font-size: 14px;
  position: absolute;
  cursor: pointer;
  z-index: 9999;
`

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