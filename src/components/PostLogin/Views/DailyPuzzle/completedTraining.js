import {useEffect, useState} from 'react'
import SmallTile from '../../../AchievementTiles/SmallTiles';
import {Link} from 'react-router-dom';
import {AchievementTileContainer, 
  AchievementTileWrapper
  } from "../../../AchievementTiles/AchievementTilesElements"
import ConfettiGenerator from 'confetti-js';
import queenImg from '../../../Puzzle/chess/pieces/nova/wQ.svg';
import useFetch from '../../../api/useFetch';
import {baseURL} from '../../../api/apiConfig';
import {FinishButton} from '../../../PostModule/PostModuleElements';
import styled from "styled-components"

export default function CompletedTraining(props) {
  const [achievements, setAchievements] = useState([])
  const {get, loading} = useFetch(baseURL)
  const userID = localStorage.getItem('userID')

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
      
      fetchAchievements()

      confetti.render()

      return(() => confetti.clear());
    },[])

    async function fetchAchievements() {
      // fetch daily achievements here and display in list in return statement
      let endpoint = `/achievements/${userID}/daily`
      let achievements = await get(endpoint)
      setAchievements(achievements)
    }
    
    return(
      <>
      <canvas id='my-canvas' style={{zIndex: '-1', position: 'absolute'}} />
      <div style={{padding: '10% 0 10% 0 ', backgroundColor:'#1464e4'}}>
        <h1 style={{textAlign: 'center', color: 'white'}}>Training Session Completed!</h1>
      </div>
      <div style={{padding: '0 0 0 0'}}>
      <h1 style={{textAlign: 'center', marginTop: '10px', color:'black'}}>Achievements</h1>
      </div>
      {(!loading) && 
      <>
      <AchievementTileContainer>
        <AchievementTileWrapper>
        {achievements && achievements.map((achievement, index) => {
            return(
                <SmallTile key={index} achievement={achievement} isMobile={props.isMobile}/>
            )
        })}
        </AchievementTileWrapper>
        <FinishButtonContainer>
        <Link to='/dashboard'>
        <FinishButton>
          Return to Dashboard
        </FinishButton>
        
        </Link>
        </FinishButtonContainer>
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
