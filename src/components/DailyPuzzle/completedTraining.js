import {useEffect, useState} from 'react'
import Loader from '../../Preloader';
import SmallTile from '../AchievementTiles/SmallTiles';
import {Link} from 'react-router-dom';
import {AchievementTileContainer, 
  AchievementTileWrapper
  } from "../AchievementTiles/AchievementTilesElements"
import ConfettiGenerator from 'confetti-js';
import queenImg from '../Puzzle/chess/pieces/nova/wQ.svg';
import useFetch from '../api/useFetch';
import {baseURL} from '../api/apiConfig';
import {FinishButton} from '../../PostPuzzleMockup/PostPuzzleMockupElements';

export default function CompletedTraining() {
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
      confetti.render()
      
      fetchAchievements()

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
      {(!loading) && 
      <>
      <div style={{padding: '15% 0 0 5%'}}>
        <h1 style={{textAlign: 'center'}}>Training Session Completed!</h1>
      </div>
      <div style={{padding: '10% 0 5% 0'}}>
      <h1 style={{textAlign: 'center', marginTop: '10px', color:'#DCDCDC'}}>Achievements</h1>
      </div>
      <hr style={{color: '#DCDCDC'}}></hr>
      <AchievementTileContainer>
        <AchievementTileWrapper>
        {achievements && achievements.map((achievement, index) => {
            return(
                <><SmallTile key={index} achievement={achievement} /></>
            )
        })}
        </AchievementTileWrapper>
        <Link to='/dashboard'>
        <FinishButton>
          Return to Dashboard
        </FinishButton>
        </Link>
      </AchievementTileContainer>
      </>
    }
      </>
    )
  }