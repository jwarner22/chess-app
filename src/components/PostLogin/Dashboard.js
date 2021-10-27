import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom";
//import { AuthContext } from "../Auth";
import firebaseConfig from "../../config.js";
import DashNavbar from './DashboardNavbar/Index'
import DashSidebar from './DashboardSidebar/Index'
import Announcements from "./Announcements/Index";
import Body from "./CoursesBody/Index";
import {AnnouncementOne} from "./Announcements/Data";
import MobileNavbar from "./MobileNavBar/MobileNavBar"
import styled from "styled-components"



const Dashboard = () => {

    //hamburger sidebar menu
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
//mobile menu
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