import { useState, useEffect } from "react";
import Board from "./OpeningPuzzleBoard.js";

export default function PuzzleManager(props) {
  
  const [history, setHistory] = useState([]);
  const [correctMove, setCorrectMove] = useState(props.correctMoves[1]);
  const [opposingMove, setOpposingMove] = useState(props.correctMoves[2]);
  const [moves, setMoves] = useState(() => {
    let moves = [...props.correctMoves];
    moves.shift(); // remove initial move
    return moves;
  });
  const [initialFen, setInitialFen] = useState(props.fen);
  const [initialMove, setInitialMove] = useState(props.correctMoves[0]);


  useEffect(() => {

    setMoves(() => {
      let moves = [...props.correctMoves]
      if (props.orientation === "black") moves.shift(); // remove initial move
      return moves;
    });
    if (props.orientation === "white") {
        setCorrectMove(props.correctMoves[0]);
        setOpposingMove(props.correctMoves[1]);
    } else {
        setCorrectMove(props.correctMoves[1]);
        setOpposingMove(props.correctMoves[2]);
    }

    setInitialFen(props.fen);
    setInitialMove(props.correctMoves[0]);
    setHistory([]);
  },[props]);

  // handles puzzle outcome
  const handleOutcome = (outcome) => {
    
    if (outcome === false) {
      props.incorrectCallback(false);
      return;
    }

    setHistory((prevHistory) => {
      let movesCopy = [...moves];
      let newMove = movesCopy.shift();
      prevHistory.push(newMove);
      let lastOpposingMove = movesCopy.shift();
      prevHistory.push(lastOpposingMove);
      // console.log({ history: history });
      return prevHistory;
    });

    setMoves((prevMoves) => {
      prevMoves.shift();
      prevMoves.shift();
      // console.log({ moves: moves });
      return prevMoves;
    });

    if (moves.length === 0) props.finishedCallback(true);

    setCorrectMove(moves[0]);
    setOpposingMove(moves[1]);
  };

  return (
    <>
      <div className="App"></div>
      <Board
        correctMoves={props.correctMoves}
        correctMove={correctMove}
        opposingMove={opposingMove}
        orientation={props.orientation}
        outcomeCallback={handleOutcome}
        initialFen={initialFen}
        initialMove={initialMove}
        count={props.count}
        onPromotion={props.onPromotion}
        promotion={props.promotion}
      />
    </>
  );
}
