import React from 'react'
import {AchievementTileContainer, 
AchievementTileWrapper
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"


const AchievementTiles = () => {
    return (
        <>
        <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile />
                <LargeTile />
                <SmallTile />
                <SmallTile />
                <SmallTile />
            </AchievementTileWrapper>
        </AchievementTileContainer>
        </>
    )
}

export default AchievementTiles
