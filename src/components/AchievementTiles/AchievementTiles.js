import React from 'react'
import { ProfilePanelHeader, ProfilePanelContainer } from '../ProfilePanel/ProfilePanelElements'
import {AchievementTileContainer, 
AchievementTileWrapper,
AchievementSelectionContainer
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"
import {AchievementsHeader} from "../ProfilePanel/ProfilePanelElements";
import flame from "../../Images/fireSVG.svg"
import flag from "../../Images/checkered-flagSVG.svg"
import target from "../../Images/targetSVG.svg"
import crown from "../../Images/crownSVG.svg"
import rook from "../../Images/rookSVG.svg"
import SectionHeader from '../SectionHeaders/SectionHeader'


const AchievementTiles = (props) => {
    const {achievements, overallRating, dailyStreak, totalScore} = props;
    const statsSection = `Statistics`;
    const achievementSection = `Achievements`;
    console.log(props.profileData)
    let accuracy = Math.floor((props.profileData.puzzles_correct/props.profileData.puzzles_completed)*100);
    return (
        <>
            <SectionHeader sectionTitle={statsSection} />
            <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile value={dailyStreak} title={'Daily Streak'} image={flame}/>
                <LargeTile value={isNaN(accuracy) ? 0 : accuracy} title={'Accuracy'} image={target}/>
                <LargeTile value={overallRating} title={'Overall Rating'} image={rook}/>
                <LargeTile value={totalScore} title={'Total Score'} image={crown}/>
                </AchievementTileWrapper>
                <ProfilePanelContainer> 
                <SectionHeader sectionTitle={achievementSection} />
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