import React, {useState, useEffect}from 'react'
import MobileNavbar from "../PostLogin/MobileNavBar/MobileNavBar"
import DashboardNavbar from "../PostLogin/DashboardNavbar/DashboardNavbar"
import DashSidebar from "../PostLogin/DashboardSidebar/DashboardSidebar"
import openingImage from "../../Images/professor.svg"
import {OpeningPageImgContainer, 
  OpeningsPagePlaceholderImg, 
  OpeningsTitle,
  OpeningPageImgWrapper
} from "./OpeningsElements"

const Openings = () => {
  
  //hamburger sidebar menu
  const [isOpen, setIsOpen] = useState(false)

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
    }
        <OpeningPageImgContainer>
          <OpeningPageImgWrapper>
            <OpeningsPagePlaceholderImg src={openingImage} />
              <OpeningsTitle>
                  Opening Trainer Coming Soon!
              </OpeningsTitle>
          </OpeningPageImgWrapper>
        </OpeningPageImgContainer>
        </div>
        </>
    )
}

export default Openings
