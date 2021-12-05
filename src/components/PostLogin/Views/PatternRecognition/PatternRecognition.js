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
    <DashboardWrapper className="page">
    {isMobile ? (
    <MobileNavbar />
    ) : (
      <>
          <DashSidebar isOpen={isOpen} toggle={toggle} />
      <DashNavbar toggle={toggle}/>
      </>
    )}
      <Body/>
      </DashboardWrapper>
      </>
  );
};
export default Dashboard;


const DashboardWrapper =styled.div`
  display: flex;
  flex-direction: column;
`
