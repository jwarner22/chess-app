import React from 'react'
import {AchievementTileContainer, 
AchievementTileWrapper,
LargeTile,
SmallTile
} from "./AchievementTilesElements"


const AchievementTiles = (props) => {
    const achievements = props;
    console.log(achievements)
    return (
        <>
        <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile>
                </LargeTile>
                <LargeTile>
                </LargeTile>
                <SmallTile>
                </SmallTile>
                <SmallTile>
                </SmallTile>
                <SmallTile>
                </SmallTile>
                <SmallTile>
                </SmallTile>
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