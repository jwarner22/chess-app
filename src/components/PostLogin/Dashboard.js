import React, { useContext, useState } from "react";
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
  // const { currentUser } = useContext(AuthContext);
  // if (!currentUser) {
  //   return <Redirect to="/login" />;

  
    
  return (
    <>
    <DashNavbar toggle={toggle}/>
    <DashSidebar isOpen={isOpen} toggle={toggle} />
      <Announcements {...AnnouncementOne}/>
      <Body/>
    </>
  );
};

export default Dashboard;