import React, {useState} from "react";
import DashNavbar from '../../DashboardNavbar/DashboardNavbar'
import DashSidebar from '../../DashboardSidebar/DashboardSidebar'
import Body from "./CoursesBody/CoursesBody";
import MobileNavbar from "../../MobileNavBar/MobileNavBar"
import styled from "styled-components"
import PageHeader from "../../../PageHeaders/PageHeaders";

import {useWindowSize} from '../../../Hooks/UseWindowSize'

const Dashboard = () => {
    //hamburger sidebar menu
  const [isOpen, setIsOpen] = useState(false)
  //const [windowDimension, setWindowDimension] = useState(null);
  const pageTitle = `Puzzles`
  const windowDimension = useWindowSize();
  const isMobile = windowDimension[0] <= 640;
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

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  //const isMobile = windowDimension <= 640;

  return (
    <>
    {isMobile ? (
      <>
      <PageHeader pageTitle={pageTitle}/>
    <MobileNavbar />
    </>
    ) : (
      <>
          <DashSidebar isOpen={isOpen} toggle={toggle} />
      <DashNavbar toggle={toggle}/>
      </>
    )}
    <DashboardWrapper>
    <HeadingWrapper>
    <PatternRecognitionHeading>Choose a <br></br> <strong>Puzzle to Play</strong></PatternRecognitionHeading>
    <PatternRecognitionSubheading>Categories</PatternRecognitionSubheading>
    </HeadingWrapper>
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
  padding-bottom: 12px;
  font-weight: 200;
  
  @media screen and (max-width: 450px) {
  font-size: 16px;
  font-weight: 200;
  opacity: 0.7;
  margin: 0px 0px 0px 24px;
  padding-bottom: 12px;
  width: 378px;
  }
`

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`