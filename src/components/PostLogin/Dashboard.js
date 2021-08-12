import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseConfig from "../../config.js";
import DashNavbar from './DashboardNavbar/Index'
import MainPage from './Announcements/Index'
import DashSidebar from './DashboardSidebar/Index'
import {Module1} from "./CoursesBody/CourseTile/Data"
import Announcements from "./Announcements/Index";
import Body from "./CoursesBody/Index";
import {AnnouncementOne} from "./Announcements/Data";



const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  //placeholder for testing
  // useEffect(() => console.log(JSON.parse(localStorage.getItem('userPublicData'))),[])

  // const { currentUser } = useContext(AuthContext);
  // if (!currentUser) {
  //   return <Redirect to="/login" />;

  
    
  return (
    <>
    <DashNavbar toggle={toggle}/>
    <DashSidebar isOpen={isOpen} toggle={toggle} />
      <Announcements {...AnnouncementOne}/>
      <Link to="PuzzleComplete" >To Puzzle</Link>
      <Body/>
    </>
  );
};

export default Dashboard;