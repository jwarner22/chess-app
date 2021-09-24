import React from 'react'
import {AchievementTileContainer, 
AchievementTileWrapper
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"


const AchievementTiles = (props) => {
    const achievements = props;
    console.log(achievements)
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

// {achievements.map(achievement => {
//     return(
//         <SmallTile>
//             {achievement.category}
//         </SmallTile>
//     )
// })}