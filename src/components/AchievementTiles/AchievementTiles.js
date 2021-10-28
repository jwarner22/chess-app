import React from 'react'
import { ProfilePanelHeader, ProfilePanelContainer } from '../ProfilePanel/ProfilePanelElements'
import {AchievementTileContainer, 
AchievementTileWrapper
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"
import {AchievementsHeader} from "../ProfilePanel/ProfilePanelElements";

const AchievementTiles = (props) => {
    const {achievements} = props;
    let accuracy = Math.floor((props.profileData.puzzles_correct/props.profileData.puzzles_completed)*100);
    return (
        <>
        <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile value={props.profileData.overall_rating} title={'Overall Rating'}/>
                <LargeTile value={accuracy} title={'Accuracy'}/>
                </AchievementTileWrapper>
                <ProfilePanelContainer> 
                <AchievementsHeader>
                Achievements
                </AchievementsHeader>
                </ProfilePanelContainer>
                <AchievementTileWrapper>
                {(achievements.length > 0) && achievements.map((achievement, index) => {
                    return(
                        <SmallTile key={index} achievement={achievement} isMobile={props.isMobile}/>
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