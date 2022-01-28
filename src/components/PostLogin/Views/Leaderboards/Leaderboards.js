import React, {useState, useEffect} from 'react'
import {Container} from "../../../Login/LoginElements";
import {LeaderboardContainer, LeaderboardHeaderContainer, LeaderboardHeaderWrapper, ComingSoonHeading, ComingSoonSubheading, LeaderboardSectionContainer} from "./LeaderboardElements"
import LeaderboardLeagues from "./LeaderboardLeagues";
import LeaderboardSection from './LeaderboardSection';
import {baseURL} from "../../../api/apiConfig";
import useFetch from '../../../api/useFetch';
import Loader from "../../../Loader";

const LeaderboardsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({});
    const [leaderboard, setLeaderboard] = useState([])
    const [isSorted, setIsSorted] = useState(false)
    const {get} = useFetch(baseURL)
    const userID = localStorage.getItem('userID');
    const leaderboardID = localStorage.getItem('leaderboardID')
    const [userPlacement, setUserPlacement] = useState();


    useEffect(() => {
        fetchProfileData();
        fetchLeaderboard();
    },[])

    
    //fetches user data
    async function fetchProfileData() {
        let endpoint = `/users/${userID}`;
        let profileData = await get(endpoint)
        setProfileData(profileData)
        setIsLoading(false)
      }
    
      //fetches leaderboard data and sorts it decending by total_score
      async function fetchLeaderboard() {
          let endpoint = `/leaderboard/${leaderboardID}`
          let leaderboard = await get(endpoint)
          // set null usernames to anonymous
          leaderboard.map((user, index) => {
              if (user.user_name==null) {
                    user.user_name = "Anon" + index
              }
              return user
          })

          setLeaderboard(leaderboard.sort(function(a, b) {
            return b.total_score - a.total_score
        }))
        const userIndex = leaderboard.findIndex(user => user.user_id === userID);
        const findUserPlacement = userIndex + 1;
        setUserPlacement(findUserPlacement);
            setIsLoading(false)
            setIsSorted(true)
            
        }


    return (
        <>
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
