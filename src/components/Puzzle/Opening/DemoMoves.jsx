import React, { useEffect, useState } from "react";
//import Chessground from "../Chessground.jsx";
import {Chessboard} from "react-chessboard";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
import moveSoundFile from "../../../assets/public_sound_standard_Move.mp3";
import captureSoundFile from "../../../assets/public_sound_standard_Capture.mp3";

import { useWindowSize } from "../../Hooks/UseWindowSize";

import {Howl} from 'howler'

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const sound = {
  move: new Howl({ src: [moveSoundFile] }),
  capture: new Howl({ src: [captureSoundFile] })
}

export default function DemoMoves(props) {
  const [fen, setFen] = useState(props.fen);
  const [game, setGame] = useState(new Chess());
  const [lastMove, setLastMove] = useState([]);
  // const [moveSound, setMoveSound] = useState(null)
  // const [captureSound, setCaptureSound] = useState(null);

  const windowSizeWidth = useWindowSize()[0];
  const [width, setWidth] = useState(windowSizeWidth);

  const moves = props.moves.slice(props.moveIndex, props.moves.length);
  // const game = new Chess(fen);
  const orientation = props.orientation;
  

    // manage board resize
    useEffect(() => {
      if (windowSizeWidth < 640){
        setWidth(windowSizeWidth)
        console.log('set width')
      } else if (windowSizeWidth > 640 && windowSizeWidth < 1300){
          setWidth(window.innerWidth / 2)
      } else if (windowSizeWidth >= 1300) {
          setWidth(650)
      }
    }, [windowSizeWidth])

  useEffect(() => {
    let isMounted = true; // note mutable flag
    
    // setMoveSound(new Howl({src: moveSoundFile}));
    // setCaptureSound(new Howl({src: captureSoundFile}));

    return () => {
      isMounted = false;
      if (sound.capture.playing()) sound.capture.stop();
      if (sound.move.playing()) sound.move.stop();
    }; // use cleanup to toggle value, if unmounted
  }, []);

  useEffect(()  => {
    if (props.startedDemo) demo();
  },[props.startedDemo]);

  async function demo() {
    await wait(1200);
    for await (const move of moves) {
      nextMove(move);
      await wait(1000);
    }
    props.demoFinished();
  }

  function playMoveSound() {
    sound.move.play()
  }

  function nextMove(move) {
    // playMoveSound();
    let from = move.substring(0, 2);
    let to = move.substring(2, 5);

    safeGameMutate((game) => {
      let move = game.move({ from: from, to: to, promotion: "q" });
      if (move == null) return;
      if (move.flags === "c") { 
        sound.capture.play();
      } else {
        sound.move.play();
      }
      return move;
    });
    //let newFen = game.fen();
    //setFen(game.fen());
    setLastMove([from,to])
  }

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  return (
    <>
        {/* <Chessground fen={fen} orientation={orientation} lastMove={lastMove}/> */}
        <Chessboard arePremovesAllowed={true} boardOrientation={orientation} position={game.fen()} areArrowsAllowed={true} animationDuration={200} boardWidth={width}/>
    </>
  );
}
