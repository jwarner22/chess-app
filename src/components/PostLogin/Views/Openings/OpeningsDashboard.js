import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import book from "../../../../Images/open-book.svg"
// import {
//   OpeningsGrid,
//   OpeningsTileContainer,
//   OpeningTileHeadline,
//   OpeningTileButton,
//   OpeningsTileLeftColumn,
//   OpeningsTileImage,
//   OpeningTileButtonWrapper,
//   OpeningTileSubheadline,
//   OpeningImgWrapper
// } from "./OpeningsElements";

import {
  MenuWrapper,
  MenuGrid,
  MenuTiles,
  MenuContent,
  MenuTitle
} from '../PatternRecognition/CoursesBody/CoursesElements';



import {CoursesWrapper, 
    ModuleWrapper
} from '../PatternRecognition/CoursesBody/CoursesElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import {HeadingWrapper, 
  PatternRecognitionHeading, 
  PatternRecognitionSubheading, 
  DashboardWrapper} from "../PatternRecognition/PatternRecognition"

import {useWindowSize} from '../../../Hooks/UseWindowSize'
import OpeningMenu from './OpeningMenu';
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import CourseTile from '../PatternRecognition/CourseTiles/CourseTiles';
import FooterBuffer from '../../../UI_Kit/FooterBuffer';


const Openings = () => {
  // const [shownCategory, setShownCategory] = useState("e4");
  const openingData = Modules.filter(module => module.category === 'opening');
  const e4Openings = Modules.filter(module => module.pawn === 'e4');
  const d4Openings = Modules.filter(module => module.pawn === 'd4');
  const c4Openings = Modules.filter(module => module.pawn === 'c4');
  // view
  const windowDimension = useWindowSize();
  const isMobile = windowDimension[0] <= 640;


//   function handleShowE4Tiles(){
//         setShownCategory("e4")
//   }

//   function handleShowC4Tiles(){
//         setShownCategory("c4")
//   }

// function handleShowD4Tiles(){
//         setShownCategory("d4")
//   }


    return (
        <>
        <DashboardWrapper>
        <OpeningMenu />
        {/* <MenuWrapper>
            <MenuGrid className="menuGrid">
              <MenuTile>

              </MenuTile> */}
                {/* <MenuTiles  className="e4Button"onClick={handleShowE4Tiles}>
                    <MenuContent>
                        <MenuImg src={endgameImg} />
                        <MenuTitle>
                            e4
                        </MenuTitle>
                    </MenuContent>
                </MenuTiles>
                <MenuTiles className="c4Button" onClick={handleShowC4Tiles}>
                    <MenuContent>
                        <MenuImg src={tacticsImg} />
                            <MenuTitle>
                                c4
                        </MenuTitle>
                    </MenuContent>
                </MenuTiles>
                <MenuTiles className="d4Button" onClick={handleShowD4Tiles}>
                    <MenuContent>
                        <MenuImg src={checkmateImg} />
                            <MenuTitle>
                                d4
                            </MenuTitle>
                    </MenuContent>
                </MenuTiles> */}
            {/* </MenuGrid>
        </MenuWrapper> */}

        <PuzzleTileGrid className="e4Tiles" id={"e4"} category={'E4 Openings'}>
        {e4Openings.map((module, index) => {
                          return(
                          // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                          <CourseTile key={index} {...module} />
                          // </ModalLink>
                      )})}
        </PuzzleTileGrid>
        <PuzzleTileGrid className="d4Tiles" id={"d4"} category={'D4 Openings'}>
        {d4Openings.map((module, index) => {
                          return(
                          // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                          <CourseTile key={index} {...module} />
                          // </ModalLink>
                      )})}
        </PuzzleTileGrid>
        <PuzzleTileGrid className="c4Tiles" id={"c4"} category={'C4 Openings'}>
        {c4Openings.map((module, index) => {
                          return(
                          // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                          <CourseTile key={index} {...module}/>
                          // </ModalLink>
                      )})}
        </PuzzleTileGrid>
        {/* <CoursesWrapper>
            <ModuleWrapper>
                <OpeningsGrid>
                    {openingData.map((module, index) => {
                        return (
                    <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/opening', state: {module: module}}}>
          
                        <OpeningsTileContainer>
                          <OpeningsTileLeftColumn>
                            <OpeningImgWrapper>
                          <OpeningsTileImage src={book} />
                          </OpeningImgWrapper>
                            <OpeningTileHeadline>
                              {module.headline}
                            </OpeningTileHeadline>
                            <OpeningTileSubheadline>
                              {module.pawn}
                            </OpeningTileSubheadline>
                            {isMobile ? ( null ) : (<OpeningTileButtonWrapper>
                            <OpeningTileButton>
                              Start
                            </OpeningTileButton>   
                            </OpeningTileButtonWrapper>)}                    
                          </OpeningsTileLeftColumn>
                        </OpeningsTileContainer>
                    </Link>
                    )})}
                </OpeningsGrid>
            </ModuleWrapper>
        </CoursesWrapper> 
        </DashboardWrapper>
        </div> */}
        </DashboardWrapper>
        <FooterBuffer />
        </>
    )
}

export default Openings

