import { useState, useEffect } from "react";
import Board from "./PuzzleBoard.js";


export default function PuzzleManager(props) {


  const [history, setHistory] = useState([]);
  const [correctMove, setCorrectMove] = useState(props.state.correctMoves[1]);
  const [opposingMove, setOpposingMove] = useState(props.state.correctMoves[2]);
  const [moves, setMoves] = useState(() => {
    let moves = [...props.state.correctMoves];
    moves.shift(); // remove initial move
    return moves;
  });
  const [initialFen, setInitialFen] = useState(props.state.fen);
  const [initialMove, setInitialMove] = useState(props.state.correctMoves[0]);
  const [finished, setFinished] = useState(false);


  useEffect(() => {
    setMoves(() => {
      let moves = [...props.state.correctMoves]
      moves.shift(); // remove initial move
      return moves;
    });
    setCorrectMove(props.state.correctMoves[1]);
    setOpposingMove(props.state.correctMoves[2]);
    setInitialFen(props.state.fen);
    setInitialMove(props.state.correctMoves[0]);
    setHistory([]);
    console.log('debugging data:', props.state.fen, props.state.correctMoves);
  },[props.state]);

  const handleOutcome = (outcome, checkmate) => {

    if (outcome === false) {
      props.displayOutcome(false);
      return;
    }

    setHistory((prevHistory) => {
      let movesCopy = [...moves];
      let newMove = movesCopy.shift();
      prevHistory.push(newMove);
      let lastOpposingMove = movesCopy.shift();
      prevHistory.push(lastOpposingMove);
      return prevHistory;
    });

    setMoves((prevMoves) => {
      prevMoves.shift();
      prevMoves.shift();
      return prevMoves;
    });

    if (moves.length === 0 || checkmate) {
      setTimeout(() => props.displayOutcome(true),  600);
      setFinished(true);
    }

    setCorrectMove(moves[0]);
    setOpposingMove(moves[1]);
  };

  return (
    <>
      <div className="App"></div>
      <Board
        correctMove={correctMove}
        opposingMove={opposingMove}
        orientation={"white"}
        outcomeCallback={handleOutcome}
        initialFen={initialFen}
        initialMove={initialMove}
        count={props.state.count}
        moveIndicator={props.moveIndicator}
        finished={finished}
      />
    </>
  );
}
