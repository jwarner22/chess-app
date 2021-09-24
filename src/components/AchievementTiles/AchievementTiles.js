import React from 'react'
import { ProfilePanelHeader } from '../ProfilePanel/ProfilePanelElements'
import {AchievementTileContainer, 
AchievementTileWrapper
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"


const AchievementTiles = (props) => {
    const {achievements} = props;
    console.log({achievements: achievements})
    
    return (
        <>
        <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile value={props.profileData.overall_rating} title={'Overall Rating'}/>
                <LargeTile value={props.profileData.total_score} title={'Total Score'}/>
                {achievements.map((achievement, index) => {
                    return(
                        <><SmallTile key={index} achievement={achievement} /></>
                    )
                })}
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