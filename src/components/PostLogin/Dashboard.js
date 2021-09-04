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
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

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
  // const [isOpen, setIsOpen] = useState(false)

  // const toggle = () => {
  //   setIsOpen(!isOpen)
  // }

  //placeholder for testing
  // useEffect(() => console.log(JSON.parse(localStorage.getItem('userPublicData'))),[])

  // const { currentUser } = useContext(AuthContext);
  // if (!currentUser) {
  //   return <Redirect to="/login" />;

  
    
  return (
    <>
    <DashboardWrapper>
    {isMobile ? (
    <MobileNavbar />
    // <DashSidebar isOpen={isOpen} toggle={toggle} />
    ) : (
      <>
      <DashNavbar toggle={toggle}/>
      <Announcements {...AnnouncementOne}/>
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