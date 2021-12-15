import React from 'react'
import { ProfilePanelHeader, ProfilePanelContainer } from '../ProfilePanel/ProfilePanelElements'
import {AchievementTileContainer, 
AchievementTileWrapper,
AchievementSelectionContainer
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"
import {AchievementsHeader} from "../ProfilePanel/ProfilePanelElements";

const AchievementTiles = (props) => {
    const {achievements, overallRating} = props;
    let accuracy = Math.floor((props.profileData.puzzles_correct/props.profileData.puzzles_completed)*100);
    return (
        <>
            <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile value={overallRating} title={'Overall Rating'}/>
                <LargeTile value={isNaN(accuracy) ? 0 : accuracy} title={'Accuracy'}/>
                </AchievementTileWrapper>
                <ProfilePanelContainer> 
                <AchievementsHeader>
                Achievements
                </AchievementsHeader>
                </ProfilePanelContainer>
                <AchievementSelectionContainer>
                <AchievementTileWrapper>
                {(achievements.length > 0) && achievements.map((achievement, index) => {
                    return(
                        <SmallTile key={index} achievement={achievement} isMobile={props.isMobile}/>
                    )
                })}
            </AchievementTileWrapper>
            </AchievementSelectionContainer>
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