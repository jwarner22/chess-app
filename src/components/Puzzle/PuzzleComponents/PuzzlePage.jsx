import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";

// import Swal from "sweetalert2";
import {getMoves, wait} from '../Utilities/helpers.js';

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
    // checks if user has missed 4 puzzles - if so route to fialure screen
    if (outcomes.filter(entry => entry === false).length > 3) {
      props.puzzleIsFinished(outcomes, 'fail')
    }
    console.log(outcomes)
  }, [outcomes]);

  useEffect(() => {
    if (progress < 100) {
      nextPuzzle();
    }
    if (progress >= 100) {
      wait(500)
      props.puzzleIsFinished(outcomes, 'succeed');
    }
  }, [progress, count])

  const nextPuzzle = () => {
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
  }

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
    setProgress(() => percent)
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
