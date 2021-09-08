import React, { useEffect, useState } from "react";
import Announcements from "../PostLogin/Announcements/Index"
import {AnnouncementOne} from "../PostLogin/Announcements/Data"
import DashNavbar from "../PostLogin/DashboardNavbar/Index"
import MobileNavbar from "../PostLogin/MobileNavBar/MobileNavBar"
import DashSidebar from "../PostLogin/DashboardSidebar/Index"

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
      <Announcements {...AnnouncementOne} /> 
      <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
          <div
            style={{
              background:
                  `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
              backgroundSize: "cover",
              height: "200px",
              width: "200px"
            }}
            className="border border-blue-300"
          ></div>
          <div className = "md:pl-4">
          <h2 className = "text-2xl font-semibold">Jamarcus</h2>
          <h3 className = "italic">Jamarcus69420@gmail.com</h3>
          </div>
        </div>
      </div>
      </>
    ) 
  };
  export default ProfilePage;

