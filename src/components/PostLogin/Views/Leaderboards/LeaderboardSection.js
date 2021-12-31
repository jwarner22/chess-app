import React, {useState, useEffect} from 'react'
import {LeaderboardSectionContainer, LeaderboardGridWrapper} from "./LeaderboardElements"
import LeaderboardTiles from "./LeaderboardTiles"
import Loader from "../../../Loader"

const LeaderboardSection = (props) => {
    const {leaderboard, userID, userPlacement, isLoading} = props;
    
    return (
        <>
            
            <LeaderboardGridWrapper> 
                {leaderboard.map((placement, index) => { 
                    const leaderboardPlacement = index + 1;
                    return(
                    <LeaderboardTiles 
                    key={index} 
                    {...placement} 
                    leaderboardPlacement={leaderboardPlacement}
                    getPlacement={userPlacement}
                    />
                )})}
            </LeaderboardGridWrapper>
        </>
    )
}

export default LeaderboardSection
