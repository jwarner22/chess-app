import React, {useState, useEffect}from 'react';
import {Link} from 'react-router-dom';
import MobileNavbar from "../../MobileNavBar/MobileNavBar";
import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";
import DashSidebar from "../../DashboardSidebar/DashboardSidebar";
import openingImage from "../../../../Images/professor.svg";
import {OpeningPageImgContainer, 
  OpeningsPagePlaceholderImg, 
  OpeningsTitle,
  OpeningPageImgWrapper
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
        <CategoryLabelContainer>
            <EndgamesLabelWrapper>
                <CategoryLabel>
                    Openings
                </CategoryLabel>
            </EndgamesLabelWrapper>
        </CategoryLabelContainer>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {OpeningData.map((module, index) => {
                        return (
                    <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/opening', state: {module: module}}}>
                        {/* <CourseTile key={index} {...module}/> */}
                        <TileWrapper>
                          <TileHeader>
                            <TileHeadline>
                              {module.headline}
                            </TileHeadline> 
                            {isMobile ? ( null ) : (
                          <TileButtonWrap>
                            <TileButton>
                              Start
                            </TileButton>
                          </TileButtonWrap>
                          )}
                          </TileHeader>
                        </TileWrapper>
                    </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </div>
        </div>
        </>
    )
}

export default Openings
