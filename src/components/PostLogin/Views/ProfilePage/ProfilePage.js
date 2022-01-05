import React, { useEffect, useState } from "react";
import styled from "styled-components"
import DashNavbar from "../../DashboardNavbar/DashboardNavbar"
import MobileNavbar from "../../MobileNavBar/MobileNavBar"
import DashSidebar from "../../DashboardSidebar/DashboardSidebar"
import ProfilePanel from "../../../ProfilePanel/ProfilePanel"
import AchievementTiles from "../../../AchievementTiles/AchievementTiles"
import useFetch from '../../../api/useFetch';
import {baseURL} from '../../../api/apiConfig';
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import { Profile } from "@styled-icons/icomoon";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [achievements, setAchievements] = useState([])
  const [profileData, setProfileData] = useState({});
  const [overallRating, setOverallRating] = useState(0);
  const {get} = useFetch(baseURL)
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
    await fetchOverallRating(profileData);
    setProfileData(profileData)
    setLoaded(true)
  }

  async function fetchOverallRating(data) {
    // get all theme data for user
    let endpoint = `/users/${userID}/themes`;
    let themes = await get(endpoint)

    // sum all them ratings
    let ratingSum = themes.reduce((acc, theme) => { 
      return acc + theme.rating;
    }, 0)

    // backfill any missing themes with initial rating
    if (themes.length < Modules.length) {
      ratingSum += (Modules.length - themes.length) * data.initial_rating;
    }

    // overall rating = average of all theme ratings
    let overallRating = Math.round(ratingSum / Modules.length);

    setOverallRating(overallRating);
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
       <AchievementTiles achievements={achievements} profileData={profileData} isMobile={isMobile} overallRating={overallRating}/>
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
    background: #EEF0FF;
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
