import React, {useEffect, useState} from 'react'
import { ProfilePanelContainer } from '../ProfilePanel/ProfilePanelElements'
import {AchievementTileContainer, 
AchievementTileWrapper,
AchievementSelectionContainer
} from "./AchievementTilesElements"
import LargeTile from "./LargeTile"
import SmallTile from "./SmallTiles"
import flame from "../../Images/fireSVG.svg"
import target from "../../Images/targetSVG.svg"
import crown from "../../Images/crownSVG.svg"
import rook from "../../Images/rookSVG.svg"
import CategoryTitle from '../UI_Kit/CategoryTitle/CategoryTitle'


const AchievementTiles = (props) => {
    const {achievements, overallRating, dailyStreak, totalScore} = props;
    const [lazyVisible, setLazyVisible] = useState(false);

    useEffect(() => {
        let visible = setTimeout(() => setLazyVisible(true), 1);
        return () => clearTimeout(visible);
    },[])

    let accuracy = Math.floor((props.profileData.puzzles_correct/props.profileData.puzzles_completed)*100);
    return (
        <>
            <CategoryTitle>
                Statistics
            </CategoryTitle>
            <AchievementTileContainer>
            <AchievementTileWrapper>
                <LargeTile value={dailyStreak} title={'Daily Streak'} image={flame}/> 
                <LargeTile value={isNaN(accuracy) ? 0 : accuracy} title={'Accuracy'} image={target}/>
                <LargeTile value={overallRating} title={'Overall Rating'} image={rook}/>
                <LargeTile value={totalScore} title={'Total Score'} image={crown}/>
                </AchievementTileWrapper>
                <ProfilePanelContainer> 
                <CategoryTitle>
                    Achievements
                </CategoryTitle>
                </ProfilePanelContainer>
                <AchievementSelectionContainer>
                <AchievementTileWrapper>
                    {lazyVisible && <>
                {(achievements.length > 0) && achievements.map((achievement, index) => {
                    return(
                        <SmallTile key={index} achievement={achievement} />
                    )
                })}
                </>}
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