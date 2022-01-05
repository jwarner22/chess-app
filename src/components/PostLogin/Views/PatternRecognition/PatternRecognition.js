import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashNavbar from '../../DashboardNavbar/DashboardNavbar'
import DashSidebar from '../../DashboardSidebar/DashboardSidebar'
import Body from "./CoursesBody/CoursesBody";
import MobileNavbar from "../../MobileNavBar/MobileNavBar"
import styled from "styled-components"


const Dashboard = () => {

    //hamburger sidebar menu
  const [isOpen, setIsOpen] = useState(false)
  const [windowDimension, setWindowDimension] = useState(null);

  const toggle = () => {
    setIsOpen(!isOpen)
  }
//mobile menu

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


  

    
  return (
    <>
    <DashboardWrapper>
    {isMobile ? (
    <MobileNavbar />
    ) : (
      <>
          <DashSidebar isOpen={isOpen} toggle={toggle} />
      <DashNavbar toggle={toggle}/>
      </>
    )}
    <PatternRecognitionHeading>Choose a <br></br> <strong>Puzzle to Play</strong></PatternRecognitionHeading>
    <PatternRecognitionSubheading>Categories</PatternRecognitionSubheading>
      <Body/>
      </DashboardWrapper>
      </>
  );
};
export default Dashboard;


const DashboardWrapper =styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #EEF0FF;
`
export const PatternRecognitionHeading = styled.h1`
  font-size: 18px;
  margin: 36px 24px 24px 24px;
  font-weight: 200;
  opacity: 0.7;
`

export const PatternRecognitionSubheading = styled.h2`
  font-size: 16px;
  font-weight: 200;
  opacity: 0.7;
  margin-left: 24px;
  padding-bottom: 12px;
`