import React from 'react';
import {LeaderboardSectionContainer, 
    LeaderboardGridWrapper, 
    LeaderboardTileContainer, 
    LeaderboardPlacement, 
    LeaderboardUsername,
    LeaderboardScore} from "./LeaderboardElements";


const LeaderboardTiles = (props) => {

    console.log(props)

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
