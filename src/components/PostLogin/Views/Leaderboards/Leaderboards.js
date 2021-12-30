import React, {useState, useEffect} from 'react'
import {Container} from "../../../Login/LoginElements";
import {LeaderboardContainer, LeaderboardHeaderContainer, LeaderboardHeaderWrapper, ComingSoonHeading, ComingSoonSubheading, LeaderboardSectionContainer} from "./LeaderboardElements"
import LeaderboardLeagues from "./LeaderboardLeagues";
import LeaderboardSection from './LeaderboardSection';
import LeaderboardTiles from "./LeaderboardTiles"
import {baseURL} from "../../../api/apiConfig"
import useFetch from '../../../api/useFetch';
import Loader from "../../../Loader"


const LeaderboardsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalScore, setTotalScore] = useState(0);
    const [profileData, setProfileData] = useState({});
    const [leaderboard, setLeaderboard] = useState([])
    // const [isSorted, setIsSorted] = useState(false)
    const {get} = useFetch(baseURL)
    const userID = localStorage.getItem('userID');
    const leaderboardID = localStorage.getItem('leaderboardID')


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
          //sorts leaderboard
          setLeaderboard(leaderboard.sort(function(a, b) {
            return b.total_score - a.total_score
        }))
        //gets the index of the user on the leaderboard
        setIsLoading(false)
      }





    return (
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
                {isLoading ? (<Loader />) : (
                    <LeaderboardSection leaderboard={leaderboard} userID={userID}/>
                )}
                </LeaderboardSectionContainer>
            </LeaderboardContainer>
        </Container>
    )
}

export default LeaderboardsPage
