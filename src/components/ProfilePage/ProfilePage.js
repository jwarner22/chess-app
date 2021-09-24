import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Announcements from "../PostLogin/Announcements/Index"
import {AnnouncementOne} from "../PostLogin/Announcements/Data"
import DashNavbar from "../PostLogin/DashboardNavbar/Index"
import MobileNavbar from "../PostLogin/MobileNavBar/MobileNavBar"
import DashSidebar from "../PostLogin/DashboardSidebar/Index"
import ProfilePanel from "../ProfilePanel/ProfilePanel"
import AchievementTiles from "../AchievementTiles/AchievementTiles"
import useFetch from '../api/useFetch';
import {baseURL} from '../api/apiConfig';

const ProfilePage = () => {
  const  [achievements, setAchievements] = useState([])
  const {get, loading} = useFetch(baseURL)
  const userID = localStorage.getItem('userID');

  useEffect(() => {
      fetchAchievements();
  },[])

  async function fetchAchievements() {
      // fetch daily achievements here and display in list in return statement
      let endpoint = `/achievements/${userID}`
      let achievements = await get(endpoint)
      setAchievements(achievements)
      console.log({'achievements': achievements})
    }

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
            <ProfilePageContainer>
      {/* <Announcements {...AnnouncementOne} />  */}
      <ProfilePanel />
      {(!loading) && <AchievementTiles achievements={achievements}/>}
      </ProfilePageContainer>
      </>
    ) 
  };
  export default ProfilePage;

const ProfilePageContainer = styled.div`
  background: #F3F5F9;
`