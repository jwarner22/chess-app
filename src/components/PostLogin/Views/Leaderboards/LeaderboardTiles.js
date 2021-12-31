import React, {useState, useEffect} from 'react';
import {LeaderboardSectionContainer, 
    LeaderboardGridWrapper, 
    LeaderboardTileContainer, 
    LeaderboardPlacement, 
    LeaderboardUsername,
    LeaderboardScore} from "./LeaderboardElements";


const LeaderboardTiles = (props) => {
    
    return (
        <>
        <LeaderboardTileContainer>
            <LeaderboardPlacement>
                {props.leaderboardPlacement}
            </LeaderboardPlacement>
            <LeaderboardUsername>
                {props.user_id}
            </LeaderboardUsername>
            <LeaderboardScore>
                {props.total_score}
            </LeaderboardScore>
        </LeaderboardTileContainer>
        </>
    )
}

export default LeaderboardTiles
