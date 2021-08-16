import React, { useEffect, useState } from "react";
import Chessground from "../Chessground.jsx";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
// import moveSoundFile from "../../assets/public_sound_standard_Move.mp3";
import {MoveSound} from '../sound.js';
// import BackgroundEvaluation from "./Stockfish";

// BackgroundEvaluation();
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

export default function DemoMoves(props) {
  const [fen, setFen] = useState(props.fen);
  const [playSound, setPlaySound] = useState(0);
  //const [success, onSuccess] = useState("none");
  console.log({ demofen: props.fen });
  const moves = props.moves.slice(props.moveIndex, props.moves.length);
  console.log(fen)  // const index = props.index;
  const game = new Chess(fen);
  //const moveSound = new Howl({src: moveSoundFile});

  useEffect(() => {
    let isMounted = true; // note mutable flag
    demo(); //;.then((data) => {
    //if (isMounted) onSuccess(data); // add conditional check
    //});
    return () => {
      isMounted = false;
    }; // use cleanup to toggle value, if unmounted
  }, []);

  //demo();

  async function demo() {
    for (const move of moves) {
      await nextMove(move);
    }
    props.demoFinished();
  }

  async function nextMove(move) {
    await wait(1000);
    let from = move.substring(0, 2);
    let to = move.substring(2, 5);
    // await wait(1000);
    // moveSound.play();
    await setPlaySound(!playSound)
    await game.move({ to: to, from: from });
    let newFen = await game.fen();
    await setFen(newFen);
    await wait(500);
    setPlaySound(!playSound)
  }

  return (
    <>
      <div style={boardsContainer}>
      <div className="box">
        <Chessground fen={fen} />
      </div>
      </div>
      {playSound ? <MoveSound /> : null}
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