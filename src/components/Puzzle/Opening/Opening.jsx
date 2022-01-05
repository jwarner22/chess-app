import React, { useEffect, useState } from "react";
import Chessground from "../Chessground.jsx";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
import moveSoundFile from "../../../assets/public_sound_standard_Move.mp3";
import {Howl} from 'howler'
import { Fence } from "styled-icons/material-outlined";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;




export default function Opening(props) {
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [movable, setMovable] = useState(null);
  //const [nextAttemptPrompt,setNextAttemptPrompt] = useState(false);
  const [next, setNext] = useState(false);
  const [game, setGame] = useState(new Chess(fen));
  const [color,setColor] = useState("");
  const [lastMove, setLastMove] = useState([]);
  const incorrectCallback = props.incorrectCallback;
  const finishedCallback = props.finishedCallback;
  const moveSound = new Howl({src: moveSoundFile});
  const moves = props.moves;
  const orientation = props.orientation;
  const count = props.count;
  
  
  useEffect(() => {

    setColor(() =>turnColor())
    if (orientation === "black") {
      initialMove();
    }
  }, []);

  useEffect(() => {
    if (count > 0) {
      nextAttempt();
      //initialMove();
    }
  },[count]);

  useEffect(() => {
    if (orientation === "black") {
      initialMove();
    }
  },[next]);

  const initialMove = async () => {
    await makeMove(
      moves[0].substring(0, 2),
      moves[0].substring(2, 4)
    );
    setMoveIndex(() => moveIndex + 1);
    let movable = calcMovable();
    setMovable(movable);
  }


  // calcs legal moves and returns chessground compatible object
  const calcMovable = () => {
    //console.log('calced movable')
    //if (turnColor() === orientation) {
      const dests = new Map();
      game.SQUARES.forEach((s) => {
        const ms = game.moves({ square: s, verbose: true });
        if (ms.length)
          dests.set(
            s,
            ms.map((m) => m.to)
          );
      });
      let color = turnColor();
      return {
        free: false,
        dests,
        color: color // "white"
      };
    //} else {
    //return;
  //}
  };

  const playSound = () => {
    moveSound.play();
  }


  async function onMove(from, to) {
    if (moveIndex >= moves.length) {
      return;
    }
    playSound();
    game.move({ from: from, to: to });
    //setFen(game.fen());
    verifyMove(from, to);
  }



  useEffect(() => {
    let movable = calcMovable();
    setMovable(movable);
  },[fen]);

  const nextAttempt = async () => {
    let newGame = new Chess();
    let newFen = newGame.fen();
    setGame(newGame);
    setFen(newFen);
    setMoveIndex(0);
    setNext((prev) => !prev);
  }

  // verify correct move
  const verifyMove = async (from, to) => {
    const correctSource = moves[moveIndex].substring(0, 2);
    const correctTarget = moves[moveIndex].substring(2, 4);
    // check correct move
    if ((to !== correctTarget) | (from !== correctSource)) {
      console.log("Incorrect!");
      await wait(750);
      incorrectCallback(fen, moveIndex);
    } else {
      console.log("Correct!");

      if (moveIndex < moves.length-1) {
        await makeMove(
          moves[moveIndex + 1].substring(0, 2),
          moves[moveIndex + 1].substring(2, 4)
        );
    
        setMoveIndex(() => moveIndex + 2);
        setColor(() => turnColor());
      } else {
        await wait(750);
        setMoveIndex(() => moveIndex + 2);
      }
      // if (moveIndex >= moves.length - 2){
      //   await wait(750);
      //   console.log('finished');
      //   //finishedCallback();
      // }
    }
  };

  useEffect(() => {
    if (moveIndex >= moves.length) {
      setFen(game.fen());
      finishedCallback();
    }
  } ,[moveIndex]);

  // useEffect(() => {
  //   let toMove = turnColor();
  //   if (toMove !== orientation) {
  //     let from = moves[moveIndex - 1].substring(0, 2);
  //     let to = moves[moveIndex - 1].substring(2, 4);
  //     makeMove(from, to);
  //   }
  // },[moveIndex]);

  const makeMove = async (from, to) => {

    await wait(750);
    
    playSound();

    game.move({
      from: from,
      to: to
    });
  
    setFen(game.fen());
    setLastMove([from, to]);
    setColor(() => turnColor());
  };



  const turnColor = () => {
    return game.turn() === "w" ? "white" : "black";
  };

  return (
    <>
    <Chessground lastMove={lastMove} movable={movable} onMove={onMove} fen={fen} orientation={orientation} turnColor={color}/>
    </>
  );
}
