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
                {props.user_name}
            </LeaderboardUsername>
            <LeaderboardScore>
                {props.total_score}
            </LeaderboardScore>
        </LeaderboardTileContainer>
        </>
    )
}

export default LeaderboardTiles
