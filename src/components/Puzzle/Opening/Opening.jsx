import React, { useEffect, useState } from "react";
import Chessground from "../Chessground.jsx";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
import moveSoundFile from "../../../assets/public_sound_standard_Move.mp3";
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
  const orientation = props.orientation;

  
  useEffect(() => {
    console.log("mounted");
    console.log(moves)
    if (orientation === "black") {
      newGame();
    }
  }, []);

  const newGame = async () => {
    await makeMove(
      moves[0].substring(0, 2),
      moves[0].substring(2, 4)
    );
    setMoveIndex(() => moveIndex + 1);
    setMovable(() => calcMovable());
  }

  useEffect(() => {
    console.log('nextAttempt')
    let movableVals = calcMovable();
    setMovable(movableVals);
  },[nextAttemptPrompt])


  // calcs legal moves and returns chessground compatible object
  const calcMovable = () => {
    console.log(moveIndex)
    if (turnColor() === orientation) {
      console.log('calced movable')
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
    } else {
    return;
  }
  };

  const playSound = async () => {
    moveSound.play();
  }


  async function onMove(from, to) {
    if (moveIndex >= moves.length) {
      return;
    }
    if (nextAttemptPrompt) {
      setNextAttemptPrompt(false)
    }
    playSound();

    game.move({ from: from, to: to });
    setFen(game.fen());

    await verifyMove(from, to);
  
    if (moveIndex < moves.length-1) {
    await makeMove(
      moves[moveIndex + 1].substring(0, 2),
      moves[moveIndex + 1].substring(2, 4)
    );

    setMoveIndex(() => moveIndex + 2);

    let movableVals = calcMovable();
    setMovable(movableVals);
    }
    
  }

  const nextAttempt = async () => {
    //await wait(1000);
    setGame(() => new Chess());
    setFen(new Chess().fen());
    setMoveIndex(0);
    setNextAttemptPrompt(true)
  }

  // verify correct move
  const verifyMove = async (from, to) => {
    const correctSource = moves[moveIndex].substring(0, 2);
    const correctTarget = moves[moveIndex].substring(2, 4);
    console.log({correctSource, correctTarget, from, to})
    // check correct move
    if ((to !== correctTarget) | (from !== correctSource)) {
      console.log("Incorrect!");
      await wait(500);
      incorrectCallback(fen, moveIndex);
    } else {
      console.log("Correct!");
      if (moveIndex >= moves.length - 1){
        await wait(1000);
        console.log('finished');
        await finishedCallback();
        await nextAttempt();
      }
    }
  };

  const makeMove = async (from, to) => {
    //playSound();
    await wait(750);
    playSound();
    game.move({
      from: from,
      to: to
    });
  
    setFen(game.fen());
  };

  const turnColor = () => {
    return game.turn() === "w" ? "white" : "black";
  };

  return (
    <>{console.log({fen:fen, movable:movable})}
    <Chessground movable={movable} onMove={onMove} fen={fen} orientation={orientation} />
    </>
  );
}
