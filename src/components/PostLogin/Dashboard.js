import React, { useState } from "react";
import { Link } from "react-router-dom"
import DashNavbar from './DashboardNavbar/Index'
import DashSidebar from './DashboardSidebar/Index'
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