import React, {useState, useEffect}from 'react';
import {Link} from 'react-router-dom';
import MobileNavbar from "../../MobileNavBar/MobileNavBar";
import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";
import DashSidebar from "../../DashboardSidebar/DashboardSidebar";
import openingImage from "../../../../Images/professor.svg";
import board from "../../../../Images/BrownBoard.svg"
import {OpeningPageImgContainer, 
  OpeningsPagePlaceholderImg, 
  OpeningsTitle,
  OpeningPageImgWrapper,
  OpeningsTitleContainer,
  OpeningsGrid,
  OpeningsTileContainer,
  OpeningsTileHeader,
  OpeningTileHeadline,
  OpeningTileButton,
  OpeningsTileLeftColumn,
  OpeningsTileRightColumn,
  OpeningsTileImage,
  OpeningTileButtonWrapper
} from "./OpeningsElements";
import {TileWrapper, 
  TileHeadline, 
  TileIcon, 
  TileIconWrap, 
  TileHeader, 
  TileSubheadline,
  TileButton,
  TileButtonWrap
} from "../PatternRecognition/CourseTiles/CourseTileElements"
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid, 
    CategoryLabel,
    CategoryLabelWrapper,
    CategoryLabelContainer,
    TacticsLabelWrapper,
    CategoryLabelContainerTop,
    CheckmatesLabelWrapper,
    EndgamesLabelWrapper,
} from '../PatternRecognition/CoursesBody/CoursesElements'
import CourseTile from '../PatternRecognition/CourseTiles/CourseTiles'
import {OpeningData} from './OpeningData';

const Openings = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  //hamburger sidebar menu
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  //mobile navbar
    const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  console.log(isMobile)

    return (
        <>
        <div className="page">
        {isMobile ? (
          <MobileNavbar />  
        ) : (
          <>
            <DashboardNavbar toggle={toggle}/>
            <DashSidebar isOpen={isOpen} toggle={toggle} />
            </>
        )
    }{/* 
        <OpeningPageImgContainer>
          <OpeningPageImgWrapper>
            <OpeningsPagePlaceholderImg src={openingImage} />
              <OpeningsTitle>
                  Opening Trainer Coming Soon!
              </OpeningsTitle>
              {/* <Link to='/opening'>
          <button>
            Opening Module
          </button>
        </Link> 
          </OpeningPageImgWrapper>
        </OpeningPageImgContainer> */}
        <div>
        <OpeningsTitleContainer>
          Openings
        </OpeningsTitleContainer>
        <CoursesWrapper>
            <ModuleWrapper>
                <OpeningsGrid>
                    {OpeningData.map((module, index) => {
                        return (
                    <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/opening', state: {module: module}}}>
                        {/* <CourseTile key={index} {...module}/> */}
                        <OpeningsTileContainer>
                          <OpeningsTileLeftColumn>
                            <OpeningTileHeadline>
                              {module.headline}
                            </OpeningTileHeadline>
                            <OpeningTileButtonWrapper>
                            <OpeningTileButton>
                              Start
                            </OpeningTileButton>   
                            </OpeningTileButtonWrapper>                     
                          </OpeningsTileLeftColumn>
                          <OpeningsTileRightColumn>
                            <OpeningsTileImage src={board} />
                          </OpeningsTileRightColumn>
                        </OpeningsTileContainer>
                    </Link>
                    )})}
                </OpeningsGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </div>
        </div>
        </>
    )
}

export default Openings
