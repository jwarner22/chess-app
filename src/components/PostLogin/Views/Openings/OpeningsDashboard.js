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
import {CoursesWrapper, 
    ModuleWrapper
} from '../PatternRecognition/CoursesBody/CoursesElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import {HeadingWrapper, PatternRecognitionHeading} from "../PatternRecognition/PatternRecognition"

import {useWindowSize} from '../../../Hooks/UseWindowSize'


const Openings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openingData = Modules.filter(module => module.category === 'opening');
  const pageTitle = `Openings`
  const windowDimension = useWindowSize();
  const isMobile = windowDimension[0] <= 640;
  //mobile navbar
    //const [windowDimension, setWindowDimension] = useState(null);

  // useEffect(() => {
  //   setWindowDimension(window.innerWidth);
  // }, []);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimension(window.innerWidth);
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

    //hamburger sidebar menu
    const toggle = () => {
      setIsOpen(!isOpen)
    }

  //const isMobile = windowDimension <= 640;

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
        {/* <OpeningPageImgContainer>
          <OpeningPageImgWrapper>
            <OpeningsPagePlaceholderImg src={openingImage} />
              <OpeningsTitle>
                  Opening Trainer Coming Soon!
              </OpeningsTitle>
          </OpeningPageImgWrapper>
        </OpeningPageImgContainer> */}
        <div>
          <HeadingWrapper>
        <PatternRecognitionHeading>Choose an <br></br> <strong>Opening to Practice</strong></PatternRecognitionHeading>
        {/* <PatternRecognitionSubheading>Categories</PatternRecognitionSubheading> */}
        </HeadingWrapper>
        <CoursesWrapper>
            <ModuleWrapper>
                <OpeningsGrid>
                    {openingData.map((module, index) => {
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
