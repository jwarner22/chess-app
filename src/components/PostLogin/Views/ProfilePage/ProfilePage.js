import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components"
import DashNavbar from "../../DashboardNavbar/DashboardNavbar"
import MobileNavbar from "../../MobileNavBar/MobileNavBar"
import DashSidebar from "../../DashboardSidebar/DashboardSidebar"
import ProfilePanel from "../../../ProfilePanel/ProfilePanel"
import AchievementTiles from "../../../AchievementTiles/AchievementTiles"
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import PageHeader from "../../../PageHeaders/PageHeaders"

import {UserContext} from '../../../../GlobalState'
import {useWindowSize} from '../../../Hooks/UseWindowSize'


const ProfilePage = () => {
  // state
  const [overallRating, setOverallRating] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [joinDate, setJoinDate] = useState('')
  const [loaded, setLoaded] = useState(false);

  // display
  const windowDimensions = useWindowSize();
  const isMobile = windowDimensions[0] <= 640;
  const [isOpen, setIsOpen] = useState(false); //hamburger sidebar menu

  // context
  const {userData} = useContext(UserContext);
  const {achievements} = useContext(UserContext);
  const {themesData} = useContext(UserContext);
  const pageTitle = `Profile`;

  useEffect(() => {
      setLoaded(false);
      fetchProfileData();
  },[])

    const toggle = () => {
      setIsOpen(!isOpen)
    }
  

  const fetchProfileData = async() => {
    
    await calcOverallRating(userData);     // get overall rating
    const streak = userData.daily_streak; // set values for profile page
    let date = new Date(userData.inserted_at); // set join date
 
    // reformat date to display
    const reformattedDate = date.toLocaleString('en-US', {
      day: 'numeric', // numeric 2-digit
      year: 'numeric', // numeric, 2-digit
      month: 'long', // numeric, 2-digit, long, short, narrow
    }).toString();

    // set state values for profile page
    setDailyStreak(streak);
    setJoinDate(reformattedDate)
    setLoaded(true)
  }


  async function calcOverallRating(data) {

    // sum all them ratings
    let profileThemesData = [...themesData];
    let ratingSum = profileThemesData.reduce((acc, theme) => { 
      return acc + theme.rating;
    }, 0)

    // backfill any missing themes with initial rating
    if (profileThemesData.length < Modules.length) {
      ratingSum += (Modules.length - profileThemesData.length) * data.initial_rating;
    }

    // overall rating = average of all theme ratings
    let overallRating = Math.round(ratingSum / Modules.length);
    setOverallRating(overallRating);
  }

    return (
      <>
      {/* {isMobile ? (
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
      )} */}
      {/* <Announcements {...AnnouncementOne} />  */}
      {(loaded) &&

      <ProfilePageContainer>
      <ProfilePanel username={userData.username} dailyStreak={dailyStreak} joinDate={joinDate}/>
       <AchievementTiles achievements={achievements} profileData={userData} isMobile={isMobile} overallRating={overallRating} dailyStreak={dailyStreak} totalScore={userData.total_score}/>
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