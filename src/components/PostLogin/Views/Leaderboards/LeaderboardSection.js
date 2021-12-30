import React, {useEffect} from 'react'
import {LeaderboardSectionContainer, LeaderboardGridWrapper} from "./LeaderboardElements"
import LeaderboardTiles from "./LeaderboardTiles"

const LeaderboardSection = (props) => {
    const {leaderboard, userID} = props;
    const userIndex = leaderboard.findIndex(user => user.user_id === userID)

    // sorts the leaderboard array by highest total score. 
    //  const sortedLeaderboard = leaderboard.sort(function(a, b) {
    //     return b.total_score - a.total_score
    // })
    // console.log(sortedLeaderboard)
    
    return (
        <>
            <LeaderboardGridWrapper> 
                {leaderboard.map((placement, index) => {
                    const leaderboardPlacement = index + 1;
                    return(
                    <LeaderboardTiles key={index} {...placement} leaderboardPlacement={leaderboardPlacement}/>
                )})}
            </LeaderboardGridWrapper>
        </>
    )
}

export default LeaderboardSection
