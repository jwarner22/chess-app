import React, {useState, useEffect}from 'react';
import {Link} from 'react-router-dom';
import MobileNavbar from "../../MobileNavBar/MobileNavBar";
import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";
import DashSidebar from "../../DashboardSidebar/DashboardSidebar";
import book from "../../../../Images/open-book.svg"
import PageHeader from "../../../PageHeaders/PageHeaders"
import {
  OpeningsGrid,
  OpeningsTileContainer,
  OpeningTileHeadline,
  OpeningTileButton,
  OpeningsTileLeftColumn,
  OpeningsTileImage,
  OpeningTileButtonWrapper,
  OpeningTileSubheadline,
  OpeningImgWrapper
} from "./OpeningsElements";

import {
  MenuWrapper,
  MenuGrid,
  MenuTile,
  MenuContent,
  MenuTitle,
  MenuImg
} from '../PatternRecognition/CoursesBody/CoursesElements';

import {CoursesWrapper, 
    ModuleWrapper
} from '../PatternRecognition/CoursesBody/CoursesElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import {HeadingWrapper, PatternRecognitionHeading} from "../PatternRecognition/PatternRecognition"

import {useWindowSize} from '../../../Hooks/UseWindowSize'


const Openings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shownCategory, setShownCategory] = useState("e4");

  const openingData = Modules.filter(module => module.category === 'opening');
  const pageTitle = `Openings`
  // view
  const windowDimension = useWindowSize();
  const isMobile = windowDimension[0] <= 640;


  function handleShowE4Tiles(){
        setShownCategory("e4")
  }

  function handleShowC4Tiles(){
        setShownCategory("c4")
  }

function handleShowD4Tiles(){
        setShownCategory("d4")
  }

  //hamburger sidebar menu
  const toggle = () => {
    setIsOpen(!isOpen)
  }

    return (
        <>
        <div className="page">
        {isMobile ? (
          <>
          <PageHeader pageTitle={pageTitle} />
          <MobileNavbar />  
          </>
        ) : (
          <>
            <DashboardNavbar toggle={toggle}/>
            <DashSidebar isOpen={isOpen} toggle={toggle} />
            </>
        )
    } 

        <div>
          <HeadingWrapper>
        <PatternRecognitionHeading>Choose an <br></br> <strong>Opening to Practice</strong></PatternRecognitionHeading>
        {/* <PatternRecognitionSubheading>Categories</PatternRecognitionSubheading> */}
        </HeadingWrapper>
        <MenuWrapper>
            <MenuGrid className="menuGrid">
                <MenuTile  className="e4Button"onClick={handleShowE4Tiles}>
                    <MenuContent>
                        {/* <MenuImg src={endgameImg} /> */}
                        <MenuTitle>
                            e4
                        </MenuTitle>
                    </MenuContent>
                </MenuTile>
                <MenuTile className="c4Button" onClick={handleShowC4Tiles}>
                    <MenuContent>
                        {/* <MenuImg src={tacticsImg} /> */}
                            <MenuTitle>
                                c4
                        </MenuTitle>
                    </MenuContent>
                </MenuTile>
                <MenuTile className="d4Button" onClick={handleShowD4Tiles}>
                    <MenuContent>
                        {/* <MenuImg src={checkmateImg} /> */}
                            <MenuTitle>
                                d4
                            </MenuTitle>
                    </MenuContent>
                </MenuTile>
            </MenuGrid>
        </MenuWrapper>
        <CoursesWrapper>
            <ModuleWrapper>
                <OpeningsGrid>
                    {openingData.map((module, index) => {
                      if (module.pawn === shownCategory) {
                        return (
                    <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/opening', state: {module: module}}}>
                        {/* { <CourseTile key={index} {...module}/> } // need to comment this line out */}
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
                    )} else {
                      return null;
                    }
                    
                    })}
                </OpeningsGrid>
            </ModuleWrapper>
        </CoursesWrapper> 
        </div>
        </div>
        </>
    )
}

export default Openings
