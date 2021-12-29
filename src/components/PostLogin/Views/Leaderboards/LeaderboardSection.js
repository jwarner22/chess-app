import React from 'react'
import {LeaderboardSectionContainer, LeaderboardGridWrapper} from "./LeaderboardElements"
import LeaderboardTiles from "./LeaderboardTiles"

const LeaderboardSection = () => {
    return (
        <LeaderboardSectionContainer>
            <LeaderboardGridWrapper>
                <LeaderboardTiles />
                <LeaderboardTiles />
                <LeaderboardTiles />
                <LeaderboardTiles />
            </LeaderboardGridWrapper>
        </LeaderboardSectionContainer>   
    )
}

export default LeaderboardSection
