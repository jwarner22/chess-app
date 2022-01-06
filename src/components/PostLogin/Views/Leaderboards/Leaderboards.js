import React, {useState, useEffect} from 'react'
import {Container} from "../../../Login/LoginElements";
import {LeaderboardContainer, LeaderboardHeaderContainer, LeaderboardHeaderWrapper, ComingSoonHeading, ComingSoonSubheading, LeaderboardSectionContainer} from "./LeaderboardElements"
import LeaderboardLeagues from "./LeaderboardLeagues";
import LeaderboardSection from './LeaderboardSection';
import LeaderboardTiles from "./LeaderboardTiles";
import {baseURL} from "../../../api/apiConfig";
import useFetch from '../../../api/useFetch';
import Loader from "../../../Loader";
import DashNavbar from "../../DashboardNavbar/DashboardNavbar"
import MobileNavbar from "../../MobileNavBar/MobileNavBar"
import DashSidebar from "../../DashboardSidebar/DashboardSidebar"



const LeaderboardsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalScore, setTotalScore] = useState(0);
    const [profileData, setProfileData] = useState({});
    const [leaderboard, setLeaderboard] = useState([])
    const [isSorted, setIsSorted] = useState(false)
    const {get} = useFetch(baseURL)
    const userID = localStorage.getItem('userID');
    const leaderboardID = localStorage.getItem('leaderboardID')
    const [userPlacement, setUserPlacement] = useState();
    const [windowDimension, setWindowDimension] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchProfileData();
        fetchLeaderboard();
    },[])

    
    //fetches user data
    async function fetchProfileData() {
        let endpoint = `/users/${userID}`;
        let profileData = await get(endpoint)
        setProfileData(profileData)
        console.log(profileData)
        setIsLoading(false)
      }
    
      //fetches leaderboard data and sorts it decending by total_score
      async function fetchLeaderboard() {
          let endpoint = `/leaderboard/${leaderboardID}`
          let leaderboard = await get(endpoint)
          console.log(leaderboard)
          setLeaderboard(leaderboard.sort(function(a, b) {
            return b.total_score - a.total_score
        }))
        const userIndex = leaderboard.findIndex(user => user.user_id === userID);
        const findUserPlacement = userIndex + 1;
        setUserPlacement(findUserPlacement);
            setIsLoading(false)
            setIsSorted(true)
            
        }
      
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

        const toggle = () => {
          setIsOpen(!isOpen)
        }

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
        <Container>
            <LeaderboardHeaderContainer>
                <LeaderboardHeaderWrapper>
                    <LeaderboardLeagues />
                        <ComingSoonHeading>
                            League Rankings Coming Soon
                        </ComingSoonHeading>
                        <ComingSoonSubheading>
                            Top 15 will advance to the next league
                        </ComingSoonSubheading>
                </LeaderboardHeaderWrapper>
            </LeaderboardHeaderContainer>
            <LeaderboardContainer>
                <LeaderboardSectionContainer>
                {isLoading ? ( <Loader /> ) : (
                    <LeaderboardSection userPlacement={userPlacement} leaderboard={leaderboard} userID={userID} isLoading={isLoading}/>
                )}     
                </LeaderboardSectionContainer>
            </LeaderboardContainer>
        </Container>
        </>
    )
}

export default LeaderboardsPage
