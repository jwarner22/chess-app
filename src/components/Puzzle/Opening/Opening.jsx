import React, { useEffect, useState } from "react";
import Chessground from "../Chessground.jsx";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
import moveSoundFile from "../../assets/public_sound_standard_Move.mp3";
import {Howl} from 'howler'


const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;




export default function Opening(props) {
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [movable, setMovable] = useState(null);
  const [nextAttemptPrompt,setNextAttemptPrompt] = useState(false);
  const [game, setGame] = useState(new Chess(fen));
  const incorrectCallback = props.incorrectCallback;
  const finishedCallback = props.finishedCallback;
  const moveSound = new Howl({src: moveSoundFile});
  const moves = props.moves;


  /*
  useEffect(() => {
    console.log("mounted");
  }, []);
*/
  useEffect(() => {
    console.log('nextAttempt')
    setMovable(calcMovable());
  },[nextAttemptPrompt])

  // calcs legal moves and returns chessground compatible object
  const calcMovable = () => {
    const dests = new Map();
    game.SQUARES.forEach((s) => {
      const ms = game.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });

    return {
      free: false,
      dests,
      color: turnColor() // "white"
    };
  };

  async function onMove(from, to) {
    if (moveIndex >= moves.length - 1) {
      return;
    }
    if (nextAttemptPrompt) {
      setNextAttemptPrompt(false)
    }
    await setMovable(calcMovable());
    await verifyMove(from, to);
    moveSound.play();
    await game.move({ from: from, to: to });
    await setFen(game.fen());
    // await setMoveIndex(moveIndex + 2);
    await makeMove(
      moves[moveIndex + 1].substring(0, 2),
      moves[moveIndex + 1].substring(2, 4)
    );
    await setFen(game.fen());
    setMoveIndex(moveIndex + 2);
    
    if (moveIndex >= moves.length - 2) {
      console.log('finished')
      await nextAttempt();
    }
  }

  const nextAttempt = async () => {
    await wait(1000);
    await setFen('');
    await setGame(new Chess());
    setMoveIndex(0);
    console.log('reset')
    setNextAttemptPrompt(true)
  }

  // verify correct move
  const verifyMove = async (from, to) => {
    const correctSource = moves[moveIndex].substring(0, 2);
    const correctTarget = moves[moveIndex].substring(2, 4);
    console.log(from);
    console.log(to);
    console.log(correctSource);
    console.log(correctTarget);
    // check correct move
    if ((to !== correctTarget) | (from !== correctSource)) {
      console.log("Incorrect!");
      //outcomes.push("incorrect");

      // await DemoMoves(fen, moves);
      await wait(1000);
      incorrectCallback(fen, moveIndex);
      //this.unlockNext();
      //this.displayOutcome(false); // success is false
      //this.isCorrect = false;
      //this.isFinished = true;
    } else {
      console.log("Correct!");

      if (moveIndex === moves.length - 2){
        await finishedCallback();
      }
      //this.isCorrect = true;
      // this.displayOutcome(true); // success is true
      //this.isFinished = false;
    }
    //console.log({ outcomes: outcomes });
  };

  const makeMove = async (from, to) => {
    console.log("move made");
    console.log({ to: to, from: from });
    await wait(250);
    game.move({
      from: from,
      to: to
    });
    console.log(game.fen());
  };

  // callback function to display outcome
  //displayOutcome = (outcome) => {
  // this.props.displayOutcome(outcome);
  //};

  /*
  const DemoMoves = (fen, moves) => {
    //const [fen, setFen] = useState(props.fen);

    //const moves = props.moves;
    // const index = props.index;
    const game = new Chess();
    demo();
    
    useEffect(() => {
      demo();
    }, []);
    

    async function demo() {
      for (const move of moves) {
        await nextMove(move);
      }
      //props.demoFinished();
    }
    async function nextMove(move) {
      let from = move.substring(0, 2);
      let to = move.substring(2, 5);
      // await wait(1000);
      await game.move({ to: to, from: from });
      let newFen = await game.fen();
      await setFen(newFen);
      await wait(1500);
    }
  };
  */

  const turnColor = () => {
    return game.turn() === "w" ? "white" : "black";
  };

  return (
    <>
    <div style={boardsContainer}><div className='box'><Chessground movable={movable} onMove={onMove} fen={fen} /></div></div>
    </>
  );
}

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 40
};