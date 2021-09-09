import {useEffect} from 'react'

import ConfettiGenerator from 'confetti-js';
import queenImg from '../Puzzle/chess/pieces/nova/wQ.svg';

export default function CompletedTraining() {
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
  
      return(() => confetti.clear());
    },[])
  
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
      </>
    )
  }