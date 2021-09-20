import {useEffect, useState} from 'react'

import ConfettiGenerator from 'confetti-js';
import queenImg from '../Puzzle/chess/pieces/nova/wQ.svg';
import useFetch from '../api/useFetch';
import {baseURL} from '../api/apiConfig';

export default function CompletedTraining() {
  const [achievements, setAchievements] = useState([])
  const {get} = useFetch(baseURL)
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
      let endpoint = `/achievements/${userID}`
      let achievements = await get(endpoint)
      setAchievements(achievements)
    }
  
    return(
      <>
      <canvas id='my-canvas' style={{zIndex: '-1', position: 'absolute'}} />
      <div style={{padding: '15% 0 0 5%'}}>
        <h1 style={{textAlign: 'center'}}>Training Session Completed!</h1>
      </div>
      <div style={{padding: '10% 0 5% 0'}}>
      <h1 style={{textAlign: 'center', marginTop: '10px', color:'#DCDCDC'}}>Achievements</h1>
      </div>
      <hr style={{color: '#DCDCDC'}}></hr>
      <ul>
        <li>Theme Category Value</li>
        {achievements && achievements.map((achievement, index) => {
          return (
            <li key={index}>{achievement.theme} {achievement.category} {achievement.value}</li>
          )
        })}
      </ul>
      </>
    )
  }