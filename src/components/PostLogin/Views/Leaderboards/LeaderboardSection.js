import React from 'react'
import {LeaderboardSectionContainer, LeaderboardGridWrapper} from "./LeaderboardElements"
import LeaderboardTiles from "./LeaderboardTiles"

const LeaderboardSection = (props) => {
    const {leaderboard} = props;
    // console.log(leaderboard)
     const sortedLeaderboard = leaderboard.sort(function(a, b) {
        return b.total_score - a.total_score
    })
    console.log(sortedLeaderboard)
    
    return (
        <LeaderboardSectionContainer>
            <LeaderboardGridWrapper>
                {sortedLeaderboard.map((placement, index) => {
                    const leaderboardPlacement = index + 1;
                    return(
                    <LeaderboardTiles key={index} {...placement} leaderboardPlacement={leaderboardPlacement}/>
                )})}
            </LeaderboardGridWrapper>
        </LeaderboardSectionContainer>   
    )
}

export default LeaderboardSection
