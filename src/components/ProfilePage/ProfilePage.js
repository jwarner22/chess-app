import React, { useEffect, useState } from "react";
import Announcements from "../PostLogin/Announcements/Index"
import {AnnouncementOne} from "../PostLogin/Announcements/Data"
import DashNavbar from "../PostLogin/DashboardNavbar/Index"
import MobileNavbar from "../PostLogin/MobileNavBar/MobileNavBar"
import DashSidebar from "../PostLogin/DashboardSidebar/Index"
import ProfilePanel from "../ProfilePanel/ProfilePanel"

const ProfilePage = () => {
  
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
      {isMobile ? (
    <MobileNavbar />
    ) : (
      <>
      <DashNavbar toggle={toggle}/>
      <DashSidebar isOpen={isOpen} toggle={toggle} />
      </>
      )}
      {/* <Announcements {...AnnouncementOne} />  */}
      <ProfilePanel />
      </>
    ) 
  };
  export default ProfilePage;

