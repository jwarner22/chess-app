import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";
//import { wait } from "./helpers";
// import Swal from "sweetalert2";
import {getMoves} from '../Utilities/helpers.js';

// import Stockfish from "./Stockfish";
// move functions to utils file

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

function EndPuzzle(outcomes) {
// route to splash screen and post results to database
console.log('working')

  // need to post results to database
  /*swal({
    title: "Nice Job!",
    button: {
      text: "Return to Homepage",
      closeModal: true
    },
    icon: "success"
  }).then((name) => {
    console.log(name);
  });
  */
/*
// post results to database here

  Swal.fire({
    title: 'Nice Job!',
    icon: 'success',
    text: `Congrats, you scored ${outcomes.filter(outcome=>outcome===true).length}/${outcomes.length}`,
    // html: <Link to="/dashboard">Back to Dashboard</Link>
  })
}
*/
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
  //const [locked, setLocked] = useState(true);
  const numPuzzles = puzzleData.length;

  useEffect(() => {
    if (progress < 100 && count <= numPuzzles) {
      setFen(puzzleData[count].fen);
      setCorrectMoves(getMoves(puzzleData[count].moves));
    } else if (progress >= 100 | count > numPuzzles) {
      EndPuzzle(outcomes);
    }
    console.log(outcomes)
  }, [progress, count, outcome]);

  const unlockNext = () => {
    /*
    if (progress >= 100 | count > numPuzzles) {
      EndPuzzle();
    } 
    */
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

  /*
  const handleClick = () => {
    if (progress < 100) {
      if (!locked) {
        setLocked(true);
      }
    }
  };
  */

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
