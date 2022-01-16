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
import PageHeader from "../../../PageHeaders/PageHeaders"
import { DateAdd } from "@styled-icons/zondicons";

const ProfilePage = () => {
  const [achievements, setAchievements] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [overallRating, setOverallRating] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [username, setUsername] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const {get} = useFetch(baseURL);
  const [loaded, setLoaded] = useState(false);
  const userID = localStorage.getItem('userID');
  const pageTitle = `Profile`;

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
      //console.log(achievements)
    }

  async function fetchProfileData() {
    let endpoint = `/users/${userID}`;
    let profileData = await get(endpoint)
    await fetchOverallRating(profileData);
    setProfileData(profileData)
    const streak = profileData.daily_streak;
    const score = profileData.total_score;
    const name = profileData.user_name;
    let date = new Date(profileData.inserted_at); 
    const reformattedDate = date.toLocaleString('en-US', {
      day: 'numeric', // numeric 2-digit
      year: 'numeric', // numeric, 2-digit
      month: 'long', // numeric, 2-digit, long, short, narrow
    }).toString()
    // setJoinDate(date)
    setUsername(name)
    setTotalScore(score)
    setDailyStreak(streak);
    setJoinDate(reformattedDate)
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


    return (
      <>
      {isMobile ? (
        <>
      <PageHeader pageTitle={pageTitle}>
      </PageHeader>
      <MobileNavbar />
      </>
    ) : (
      <>
      <DashNavbar toggle={toggle}/>
      <DashSidebar isOpen={isOpen} toggle={toggle} />
      </>
      )}
      {/* <Announcements {...AnnouncementOne} />  */}
      {(loaded) &&

      <ProfilePageContainer>
      <ProfilePanel username={username} dailyStreak={dailyStreak} joinDate={joinDate}/>
       <AchievementTiles achievements={achievements} profileData={profileData} isMobile={isMobile} overallRating={overallRating} dailyStreak={dailyStreak} totalScore={totalScore}/>
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
