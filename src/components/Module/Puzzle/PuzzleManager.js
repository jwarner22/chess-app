import { useState, useEffect } from "react";
import Board from "./PuzzleBoard.js";


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
  const [finished, setFinished] = useState(false);


  useEffect(() => {
    setMoves(() => {
      let moves = [...props.correctMoves]
      moves.shift(); // remove initial move
      return moves;
    });
    setCorrectMove(props.correctMoves[1]);
    setOpposingMove(props.correctMoves[2]);
    setInitialFen(props.fen);
    setInitialMove(props.correctMoves[0]);
    setHistory([]);
    console.log('debugging data:', props.fen, props.correctMoves);
  },[props]);

  const handleOutcome = (outcome, checkmate) => {


    if (outcome === false) {
      // do failed logic (callback?)
      props.displayOutcome(false);
      props.unlockNext();
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
      return prevMoves;
    });
    console.debug({ moves: moves });

    if (moves.length === 0 || checkmate) {
      setTimeout(() => props.displayOutcome(true),  600);
      setFinished(true);
      props.unlockNext();
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
        count={props.count}
        onPromotion={props.onPromotion}
        promotion={props.promotion}
        moveIndicator={props.moveIndicator}
        finished={finished}
      />
    </>
  );
}
