import React from 'react';
import {LeaderboardSectionContainer, 
    LeaderboardGridWrapper, 
    LeaderboardTileContainer, 
    LeaderboardPlacement, 
    LeaderboardUsername,
    LeaderboardScore} from "./LeaderboardElements";


const LeaderboardTiles = () => {
    return (
        <>
        <LeaderboardTileContainer>
            <LeaderboardPlacement>
                1
            </LeaderboardPlacement>
            <LeaderboardUsername>
                Username
            </LeaderboardUsername>
            <LeaderboardScore>
                1200
            </LeaderboardScore>
        </LeaderboardTileContainer>
        </>
    )
}

export default LeaderboardTiles
