import React, { useEffect, useState } from "react";
import Chessground from "../Chessground.jsx";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
import moveSoundFile from "../../../assets/public_sound_standard_Move.mp3";
import {Howl} from 'howler'

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export default function DemoMoves(props) {
  const [fen, setFen] = useState(props.fen);
  const moveSound = new Howl({src: moveSoundFile})
  const moves = props.moves.slice(props.moveIndex, props.moves.length);
  const game = new Chess(fen);
  const orientation = props.orientation;

  useEffect(() => {
    let isMounted = true; // note mutable flag
 
    return () => {
      isMounted = false;
    }; // use cleanup to toggle value, if unmounted
  }, []);

  useEffect(()  => {
    if (props.startedDemo) demo();
  },[props.startedDemo]);

  async function demo() {
    await wait(1200);
    for await (const move of moves) {
      await nextMove(move);
      await wait(1000);
    }
    props.demoFinished();
  }

  async function playMoveSound() {
    return moveSound.play()
  }

  async function nextMove(move) {
    playMoveSound();
    let from = move.substring(0, 2);
    let to = move.substring(2, 5);
        
    
    game.move({ to: to, from: from });
    let newFen = game.fen();
    setFen(newFen);
  }

  return (
    <>
        <Chessground fen={fen} orientation={orientation}/>
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