import {useEffect, useContext, useState} from 'react'
import SmallTile from '../../../AchievementTiles/SmallTiles';
import {Link} from 'react-router-dom';
import {AchievementTileContainer, 
  AchievementTileWrapper
  } from "../../../AchievementTiles/AchievementTilesElements"
import ConfettiGenerator from 'confetti-js';
import queenImg from '../../../Puzzle/chess/pieces/nova/wQ.svg';
import {FinishButton} from '../../../PostModule/PostModuleElements';
import styled from "styled-components"

// context
import {UserContext} from '../../../../providers/GlobalState'

export default function CompletedTraining(props) {
  const [loading, setLoading] = useState(true);
  let {achievements} = useContext(UserContext);
  // create sorted array of achievements by insterted_at
  let sortedAchievements = achievements.sort((a,b) => { return a.inserted_at - b.inserted_at });
  // fileter achievements by inserted_at as current day
  let todayAchievements = sortedAchievements.filter(achievement => { return new Date(achievement.inserted_at).toDateString() === new Date().toDateString() });
  // map achievements to maximum of 20 
  todayAchievements = todayAchievements.slice(0,20);
  
    useEffect(() => {
      const confettiSettings = {
        target: 'my-canvas',
        animate: true,
        props: [
          "square",
          "triange",
          "line",
          {
            type: "svg",
            src: queenImg,
            size: 30,
            weight: 0.3
          }
        ],
        respawn: false,
        start_from_edge: true,
        rotate: true
      };
      const confetti = new ConfettiGenerator(confettiSettings)

      confetti.render()
      setLoading(false);
      return(() => confetti.clear());
    },[])

    const handleClick = () => {
      localStorage.setItem('completedTrainingDisplayed', 'true')
    }

    return(
      <>
      <canvas id='my-canvas' style={{zIndex: '-1', position: 'absolute'}} />
      <div style={{padding: '40px 0 40px 0 ', backgroundColor:'#1464e4'}}>
        <h1 style={{textAlign: 'center', color: 'white'}}>Training Session Completed!</h1>
      </div>
      <div style={{padding: '0 0 0 0'}}>
      <FinishButtonContainer>
        <Link to='/home/daily'>
        <FinishButton onClick={handleClick}>
          Continue
        </FinishButton>
        </Link>
        </FinishButtonContainer>
      <h1 style={{textAlign: 'center', marginTop: '10px', color:'black'}}>Achievements</h1>
      </div>
      {(!loading) && 
      <>
      <AchievementTileContainer>
        <AchievementTileWrapper>
        {todayAchievements && todayAchievements.map((achievement, index) => {
            return(
                <SmallTile key={index} achievement={achievement} isMobile={props.isMobile}/>
            )
        })}
        </AchievementTileWrapper>
      </AchievementTileContainer>
      </>
    }
      </>
    )
  }
  

  export const FinishButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  `
