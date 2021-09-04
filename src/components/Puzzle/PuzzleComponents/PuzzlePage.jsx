import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";

// import Swal from "sweetalert2";
import {getMoves, wait} from '../Utilities/helpers.js';
import confirmationSoundFile from "../../../assets/public_sound_standard_Confirmation.mp3";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav"
import styled from "styled-components"
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
  const confirmationSound = new Howl({src: confirmationSoundFile})
  const errorSound = new Howl({src: errorSoundFile})

  const numPuzzles = puzzleData.length;

  useEffect(() => {
    // checks if user has missed 4 puzzles - if so route to fialure screen
    if (outcomes.filter(entry => entry === false).length > 3) {
      fail()
    }
  }, [outcomes]);

  useEffect(() => {
    if (progress < 100) {
      nextPuzzle();
    }
  }, [count])

  // puzzle module is finished
  const finished = async () => {
    await wait(1000)
    props.puzzleIsFinished(outcomes, 'succeed');
  }

  // module failed
  const fail = async () => {
    wait(1000)
    props.puzzleIsFinished(outcomes, 'fail')
  }

  // track next puzzle
  const nextPuzzle = () => {
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
  }

  const unlockNext = () => {
    // legacy - used to unlock button. Saving for now 
  };

  const displayOutcome = (success) => {
    // play sound to indicate success or failure
    if (success) {
      confirmationSound.play()

    } else {
      errorSound.play()
    }
    
    setOutcome(success);
    setOutcomes(prevOutcomes => [...prevOutcomes, success]);
    incrementCount();
  };

  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  
  const returnPercent = (percent) => {
    setProgress(percent)
    if (percent >= 100) {
      finished()
    }
  }

  return (
    <div>
      <PuzzlePageContainer>
      <div style={progressContainer}>
        <ProgressBar outcome={outcome} returnPercent={returnPercent} count={count}/>
      </div>
      <PuzzleBoardWrapper>
        <PuzzleBoard
          fen={fen}
          correctMoves={correctMoves}
          unlockNext={unlockNext}
          count={count}
          displayOutcome={displayOutcome}
        />
      </PuzzleBoardWrapper>
      <div>
      <PuzzleNav />
      </div>
     </PuzzlePageContainer>
    </div>
  );
}

const progressContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "24px",
  marginBottom: "24px"
};

const PuzzlePageContainer = styled.div `
  display: grid;
  height: 100vh;
  grid-template-rows: 10% 70% 20%;
  `

const PuzzleBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`