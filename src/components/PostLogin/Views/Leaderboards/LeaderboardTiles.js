import React, {useState, useEffect} from 'react';
import {LeaderboardSectionContainer, 
    LeaderboardGridWrapper, 
    LeaderboardTileContainer, 
    LeaderboardPlacement, 
    LeaderboardUsername,
    LeaderboardScore} from "./LeaderboardElements";


const LeaderboardTiles = (props) => {
    const [isUser, setIsUser] = useState(false);
    
    function handleIsUser() {
        if(props.leaderboardPlacement == props.getPlacement){
            setIsUser(true)
        }
    }
    console.log(props.leaderboardPlacement)
    console.log(props.getPlacement)
    console.log(isUser)

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
