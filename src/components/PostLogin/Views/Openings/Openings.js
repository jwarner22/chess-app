import React, {useState, useEffect}from 'react'
import MobileNavbar from "../../MobileNavBar/MobileNavBar"
import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar"
import DashSidebar from "../../DashboardSidebar/DashboardSidebar"
import openingImage from "../../../../Images/professor.svg"
import {OpeningPageImgContainer, 
  OpeningsPagePlaceholderImg, 
  OpeningsTitle,
  OpeningPageImgWrapper
} from "./OpeningsElements";
import PromotionalModal from "../../PromotionModal/PromotionalModal"

const Openings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
      setOpenModal(prev => !prev)
  }
  
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
    }
        <OpeningPageImgContainer>
          <OpeningPageImgWrapper>
            <button onClick={handleOpenModal}>Modal</button>
            <PromotionalModal openModal={openModal} setOpenModal={setOpenModal}/>
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
