import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";
//import { wait } from "./helpers";
// import Swal from "sweetalert2";
import {getMoves} from '../Utilities/helpers.js';

// import Stockfish from "./Stockfish";
// move functions to utils file

/*
function NextButton(props) {
  const handleClick = props.onClick;

  return(
    <div className={"next-button-container"}>
      <button
        id="next-button"
        className={"next-button"}
        onClick={handleClick}
      >
        {" "}
        {"Next Puzzle"}{" "}
      </button>
    </div>
  )
}
*/


export default function PuzzlePage(props) {
  const puzzleData = props.puzzles;
  const [count, setCount] = useState(0);
  const [fen, setFen] = useState(puzzleData[0].fen);
  const [progress, setProgress] = useState(count);
  const [outcome, setOutcome] = useState(null)
  const [outcomes,setOutcomes] = useState([]);
  const [correctMoves, setCorrectMoves] = useState(
    getMoves(puzzleData[0].moves)
  );

  const numPuzzles = puzzleData.length;

  useEffect(() => {
    console.log('effect')
    if (progress < 100 && count <= numPuzzles) {
      setFen(puzzleData[count].fen);
      setCorrectMoves(getMoves(puzzleData[count].moves));
    } else if (progress >= 100 | count > numPuzzles) {
      console.log(outcomes)
      props.puzzleIsFinished(outcomes, 'succeed');
    } 
    
    if (outcomes.filter(entry => entry === false).length > 3) {
      console.log('why u no work bby')
      props.puzzleIsFinished(outcomes, 'fail')
    }
    console.log(outcomes)
  }, [progress, count, outcomes]);

  const unlockNext = () => {
    // used to unlock button. Saving for now just 
  };

  const displayOutcome = (success) => {
    setOutcome(success);
    setOutcomes(prevOutcomes => [...prevOutcomes, success]);
    incrementCount();
  };

  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  
  const returnPercent = (percent) => {
    setProgress(percent)
  }

  return (
    <div>
      <div style={progressContainer}>
        <ProgressBar outcome={outcome} returnPercent={returnPercent} count={count}/>
      </div>
      <div>
        <PuzzleBoard
          fen={fen}
          correctMoves={correctMoves}
          unlockNext={unlockNext}
          count={count}
          displayOutcome={displayOutcome}
        />
      </div>
    </div>
  );
}

const progressContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 30,
  marginBottom: 40
};
