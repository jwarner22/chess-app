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
import {Container} from "../Login/LoginElements"
import {AchievementsHeader} from "../ProfilePanel/ProfilePanelElements";

const ProfilePage = () => {
  const  [achievements, setAchievements] = useState([])
  const [profileData, setProfileData] = useState({});
  const {get, loading} = useFetch(baseURL)
  const [loaded, setLoaded] = useState(false)
  const userID = localStorage.getItem('userID');

  useEffect(() => {
      setLoaded(false)
      fetchAchievements();
      fetchProfileData();
  },[])

  async function fetchAchievements() {
      // fetch daily achievements here and display in list in return statement
      let endpoint = `/achievements/${userID}`
      let achievements = await get(endpoint)
      setAchievements(achievements)
    }

  async function fetchProfileData() {
    let endpoint = `/users/${userID}`;
    let profileData = await get(endpoint)
    setProfileData(profileData)
    setLoaded(true)
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
      {/* <Announcements {...AnnouncementOne} />  */}
      {(loaded) &&

      <ProfilePageContainer>
      <ProfilePanel />
       <AchievementTiles achievements={achievements} profileData={profileData} isMobile={isMobile} />
       </ProfilePageContainer>
      }
      </>
    ) 
  };
  export default ProfilePage;

const ProfilePageContainer = styled.div`
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #F3F5F9;
    min-height: 100vh;
    min-width: 100vw;
`

const ProfilePageWrapper = styled.div`
    padding-top: 32px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const AchievementTileWrapper = styled.div`
    padding-bottom: 56px;
`