import React, { useState, useEffect} from "react";
import PuzzleBoard from "./PuzzleBoard";
// import ProgressLine from "./ProgressLine";
import ProgressBar from "../Utilities/Progress";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
//import { wait } from "./helpers";
import swal from "sweetalert";
import {getMoves} from '../Utilities/helpers.js';

// import Stockfish from "./Stockfish";
// move functions to utils file

/*
const notify = (success) => {
  if (success) {
    toast.success(`🚀 Correct! Nice job.`);
  } else {
    toast.error(`😲 Incorrect.`);
  }
};
*/

// template for swal page exit
//function ExitPuzzle() {
//swal({
//title: "Are you sure?",
//text: "Are you sure that you want to leave this page?",
//icon: "warning",
//dangerMode: true,
//})
//.then(willDelete => {
//if (willDelete) {
//swal("Deleted!", "Your imaginary file has been deleted!", "success");
//}
//});
// }

function EndPuzzle() {
  // need to post results to database
  swal({
    title: "Nice Job!",
    button: {
      text: "Return to Homepage",
      closeModal: true
    },
    icon: "success"
  }).then((name) => {
    console.log(name);
  });
}

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



export default function PuzzlePage(props) {
  console.log(props.puzzles)
  const puzzleData = props.puzzles;
  const [count, setCount] = useState(0);
  const [fen, setFen] = useState(puzzleData[0].fen);
  const [progress, setProgress] = useState(count);
  const [outcome, setOutcome] = useState(null)
  const [correctMoves, setCorrectMoves] = useState(
    getMoves(puzzleData[0].moves)
  );
  const [locked, setLocked] = useState(true);
  const numPuzzles = puzzleData.length;

  useEffect(() => {
    if (progress < 100 && count <= numPuzzles) {
      setFen(puzzleData[count].fen);
      setCorrectMoves(getMoves(puzzleData[count].moves));
    } else if (progress >= 100 | count > numPuzzles) {
      EndPuzzle();
    }
  }, [progress, count, outcome]);

  const unlockNext = () => {
    setLocked(false);
    if (progress >= 100 | count > numPuzzles) {
      EndPuzzle();
    }
  };

  const displayOutcome = (success) => {
    // notify(success);
    setOutcome(success);
    incrementCount();
    // setOutcome(success);
  };

  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  
  const returnPercent = (percent) => {
    setProgress(percent)
  }

  const handleClick = () => {
    if (progress < 100) {
      if (!locked) {
        //incrementCount();
        setLocked(true);
      }
    }
  };

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

//       <NextButton onClick={handleClick} />

