import React, {useState, useLayoutEffect, useContext} from 'react'
import {Container} from "../../../Login/LoginElements";
import {LeaderboardContainer, LeaderboardHeaderContainer, LeaderboardHeaderWrapper, ComingSoonHeading, ComingSoonSubheading, LeaderboardSectionContainer} from "./LeaderboardElements"
import LeaderboardLeagues from "./LeaderboardLeagues";
import LeaderboardSection from './LeaderboardSection';
import {baseURL} from "../../../../api/apiConfig";
import useFetch from '../../../../api/useFetch';
import {UserContext} from '../../../../providers/GlobalState'
import ChessboardLoader from '../../../ChessBoardLoader/ChessboardLoader';

const LeaderboardsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([])
    const [userPlacement, setUserPlacement] = useState();

    const {get} = useFetch(baseURL);

    const {userId} = useContext(UserContext);


    useLayoutEffect(() => {
        fetchLeaderboard();
    },[])

      //fetches leaderboard data and sorts it decending by total_score
      async function fetchLeaderboard() {
          let now = new Date();
          let expiration = new Date(localStorage.getItem('leaderboard_exp'));
          if (expiration == null) expiration = now; // if no expiration date, set to now
          
          if (now < expiration) { // if leaderboard is still valid
                console.log('pull from local storage')
                let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
                let userIndex = 0;
                if (!leaderboard.some(user => user.id === userId)) { // if user is not in the leaderboard   
                      userIndex = leaderboard.length + 1;
                  } else {
                      userIndex = leaderboard.findIndex(user => user.user_id === userId);
                  }
                  setLeaderboard(leaderboard);
                  setUserPlacement(userIndex + 1);
                  setIsLoading(false)
                return
          }
          
          const leaderboardID = localStorage.getItem('leaderboardID')
          let endpoint = `/leaderboard/${leaderboardID}`
          let leaderboard = await get(endpoint)
          // set null usernames to anonymous
          leaderboard.map((user, index) => {
              if (user.user_name==null) {
                    user.user_name = "Anon" + index
              }
              return user
          })
          let sortedLeaderboard = leaderboard.sort((a,b) => b.total_score - a.total_score)
          // save leaderboard to localstorage
          localStorage.setItem('leaderboard', JSON.stringify(sortedLeaderboard))
          // set expiration date for leaderboard
          now.setHours(now.getHours() + 1);
          now = now.toString();
          localStorage.setItem('leaderboard_exp', now)

          setLeaderboard(sortedLeaderboard)
          let userIndex = 0;
          if (!leaderboard.some(user => user.id === userId)) { // if user is not in the leaderboard   
                userIndex = leaderboard.length + 1;
            } else {
                userIndex = leaderboard.findIndex(user => user.user_id === userId);
            }
            setUserPlacement(userIndex + 1);
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
                {isLoading ? ( <ChessboardLoader /> ) : (
                    <LeaderboardSection userPlacement={userPlacement} leaderboard={leaderboard} userID={userId} isLoading={isLoading}/>
                )}     
                </LeaderboardSectionContainer>
            </LeaderboardContainer>
        </Container>
        </>
    )
}

export default LeaderboardsPage
