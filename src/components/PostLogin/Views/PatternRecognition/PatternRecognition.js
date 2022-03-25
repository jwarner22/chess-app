import {useState, useEffect} from 'react'
import styled from "styled-components";
import MotifMenu from "./MotifMenu/MotifMenu";
import FooterBuffer from '../../../UI_Kit/FooterBuffer';
import Button from '../../../UI_Kit/Button/Button';
import {Modules} from '../../../../data/ModuleData';
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import CourseTile from './CourseTiles/CourseTiles';
import {Link} from 'react-router-dom'
import ChessboardLoader from '../../../ChessBoardLoader/ChessboardLoader';
import {motion} from 'framer-motion'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const endgameModules = Modules.filter(module => module.type === "endgame")
  const tacticModules = Modules.filter(module => module.type === "midgame")
  const checkmateModules = Modules.filter(module => module.type === "checkmate")

  const container = {
    show: {
        transition: {
            staggerChildren: 0.35
        }
    }
}

const item = {
  hidden: {
      opactiy: 0, 
      y: 200,
  },
  show: {
      opacity: 1,
      y: 0,
      transition: {
          ease: [0.6, 0.01, -0.05, 0.95],
          duration: 1.6,
      }
  },
  exit: {
      opacity: 0,
      y: -200
  }
};

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  },[])

  const TileList = () => {
    return (<>
            <motion.div>
                       <PuzzleTileGrid 
                            className="endgameTiles" 
                            id={"endgames"} 
                            category={"Endgames"}
                            as={motion.div}
                            variants={container}
                            initial='hidden'
                            animate='show'
                            exit='exit'
                        >
               {endgameModules.map((module, index) => {
                                 return(
                                 // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                                 <CourseTile 
                                    as={motion.div}
                                    variants={item}
                                    key={index} 
                                    {...module} />
                                 // </ModalLink>
                             )})}
             </PuzzleTileGrid>
             </motion.div>
             {!isLoading && <>
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
    </>)
  }
  

  
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    let loadTimeout = setTimeout(() => setVisible(true),30);
    return () => clearTimeout(loadTimeout);
  },[])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [])

  return (
    <>
    {/* <Link to="/feature_suggestion">
    <FeatureSuggestionButton primary>
      Suggest a Feature
    </FeatureSuggestionButton>
    </Link>
    */}
    {/* <Link to='/openings-dashboard-test/e2e4 e7e5'>
    <FeatureSuggestionButton primary>
      openings test
    </FeatureSuggestionButton>
    </Link>
    <Link to='/testing'>
    <FeatureSuggestionButton primary>
      Testing Page
    </FeatureSuggestionButton>
    </Link> */}
    <DashboardWrapper>
        <MotifMenu 
        toggle={toggle}
        />
        {isLoading ? (<ChessboardLoader />) : (
          <TileList />
        )}
 
    </DashboardWrapper>
    <FooterBuffer />
      </>
  );
};
export default Dashboard;

export const FeatureSuggestionButton = styled(Button)`
  font-size: 14px;
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