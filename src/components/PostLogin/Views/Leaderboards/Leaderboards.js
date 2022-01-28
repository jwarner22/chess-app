import React, {useState, useEffect, useContext} from 'react'
import {Container} from "../../../Login/LoginElements";
import {LeaderboardContainer, LeaderboardHeaderContainer, LeaderboardHeaderWrapper, ComingSoonHeading, ComingSoonSubheading, LeaderboardSectionContainer} from "./LeaderboardElements"
import LeaderboardLeagues from "./LeaderboardLeagues";
import LeaderboardSection from './LeaderboardSection';
import {baseURL} from "../../../api/apiConfig";
import useFetch from '../../../api/useFetch';
import Loader from "../../../Loader";

import {UserContext} from '../../../../GlobalState'

const LeaderboardsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([])
    const [userPlacement, setUserPlacement] = useState();

    const {get} = useFetch(baseURL);

    const {userId} = useContext(UserContext);
    const leaderboardID = localStorage.getItem('leaderboardID')


    useEffect(() => {
        fetchLeaderboard();
    },[])

    
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
        const userIndex = leaderboard.findIndex(user => user.user_id === userId);
        const findUserPlacement = userIndex + 1;
        setUserPlacement(findUserPlacement);
            setIsLoading(false)
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
                    <LeaderboardSection userPlacement={userPlacement} leaderboard={leaderboard} userID={userId} isLoading={isLoading}/>
                )}     
                </LeaderboardSectionContainer>
            </LeaderboardContainer>
        </Container>
        </>
    )
}

export default LeaderboardsPage
