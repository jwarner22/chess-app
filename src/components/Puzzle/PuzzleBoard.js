
import { useState, useEffect, useLayoutEffect } from "react";
import * as ChessJS from "chess.js";
import { Chessboard } from "react-chessboard";

import PromotionalModal from "../PostLogin/PromotionModal/PromotionalModal"


import {Howl} from 'howler';
import moveSoundFile from "../../assets/public_sound_standard_Move.mp3";
import captureSoundFile from "../../assets/public_sound_standard_Capture.mp3";

import usePrevious from "../Hooks/usePrevious";
import { useWindowSize } from "../Hooks/UseWindowSize";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const sound = {
  move: new Howl({ src: moveSoundFile }),
  capture: new Howl({ src: captureSoundFile })
}

export default function PuzzleBoard(props) {
  const [game, setGame] = useState(null);
  const [piece, setPiece] = useState("");
  const [pieceSquare, setPieceSquare] = useState("");
  const [optionSquares, setOptionSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [inCheckSquare, setInCheckSquare] = useState({});
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [orientation, setOrientation] = useState(() => {
    let g = new Chess(props.initialFen);
    return g.turn() === "w" ? "black" : "white";
  });
  // const [moveSound, setMoveSound] = useState(() => new Howl({src: moveSoundFile}));
  // const [captureSound, setCaptureSound] = useState(() => new Howl({src: captureSoundFile}));
  const [loaded, setLoaded] = useState(false);
  const [pendingMove, setPendingMove] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [promotion, setPromotion] = useState("x");
  const [moveHighlightSquare,setMoveHighlightSquare] = useState("");
  //const [width, setWidth] = useState(0)
  const windowSizeWidth = useWindowSize()[0];
  const [width, setWidth] = useState(windowSizeWidth);

  //const prevPromotion = usePrevious(props.promotion);
  const prevCorrect = usePrevious(props.correctMove);
  const prevInitial = usePrevious(props.initialFen);
  

  const { correctMove, opposingMove, outcomeCallback} = props;

  // manage board resize
  useEffect(() => {
    if (windowSizeWidth < 640){
      setWidth(windowSizeWidth)
    } else if (windowSizeWidth > 640 && windowSizeWidth < 1300){
        setWidth(window.innerWidth / 2)
    } else if (windowSizeWidth >= 1300) {
        setWidth(650)
    }
  }, [windowSizeWidth])

  // EFFECTS

  // play initial move after all is rendered and timed delay for animation
  useLayoutEffect(() => {

    // setMoveSound(new Howl({src: moveSoundFile}));
    // setCaptureSound(new Howl({src: captureSoundFile}));
    setGame(() => new Chess(props.initialFen));
    setLoaded(true);
  },[]); 

  // cleanup to avoid memory leaks
  useEffect(() => {

    return () => {
      // if (captureSound !== null) captureSound.unload();
      // if(moveSound !== null) moveSound.unload(); 
      if (sound.move.playing()) sound.move.unload();
      if (sound.capture.playing()) sound.capture.unload();
    }
  },[])

  useLayoutEffect(() =>{
    props.moveIndicator(orientation);
  },[])

  useEffect(() => {
    if (promotion !== "x") {
      console.log('promotion');
      handlePromotion(promotion);
    }
  },[promotion]);

  useLayoutEffect(() => {
      // console.log({propsinitial: props.initialFen})
      // console.log({prevInitial: prevInitial});
      if (prevInitial == null) {
        setTimeout(makeInitialMove, 1000);
        return;
      }
      if (props.initialFen === prevInitial) return;

      console.log('new puzzle')
      setGame(() => new Chess(props.initialFen));
      setOrientation(() => {
        let g = new Chess(props.initialFen);
        let orient = g.turn() === "w" ? "black" : "white";
        props.moveIndicator(orient);
        return orient;
      });
      
      setTimeout(makeInitialMove, 1000);
  },[props.initialFen]);

  // INITIAL MOVE

  function makeInitialMove() {
    console.log("initialMove");
    let from = props.initialMove.substring(0,2);
    let to = props.initialMove.substring(2);

    safeGameMutate((game) => {
      let m = game.move({ from: from, to: to });
      if (m == null) return;
      if (m.flags === "c") { 
        // captureSound.play();
        //sound.capture.play();
      } else {
        //moveSound.play();
        //sound.move.play();
      }
      return m;
    });
  }

  // // returns color of current turn
  // const  turnColor = () => {
  //   return game.turn() === "w" ? "white" : "black";
  // };

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  // GAME MOVES

  function onSquareClick(targetSquare) {
    setRightClickedSquares({});

    setPieceSquare(targetSquare);

    if (props.promotion !== "x") return;
    if (piece.substring(1) === "P") {
      let promote = checkPromotion(pieceSquare,targetSquare)
      if (promote) return false;
    }
    // attempt to make move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: pieceSquare,
      to: targetSquare,
      //promotion: "q" // always promote to a queen for example simplicity
    });
    // if invalid, setMoveFrom and getMoveOptions
    if (targetSquare !== moveHighlightSquare) {
      getMoveOptions(targetSquare);
    }
    
    if (move == null) {
      return false;
    }

    if (move.flags === "c") {
      //captureSound.play();
      sound.capture.play();
    } else {
      //moveSound.play();
      sound.move.play();
    };
    setGame(gameCopy);

    
    validateMove(pieceSquare, targetSquare);
    setMoveSquares({
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      [targetSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" }
    });

    return true;
  }

  function onPieceDrop(sourceSquare, targetSquare, piece) {

    // check for pomotion
    if (piece.substring(1) === "P") {
      let promote = checkPromotion(sourceSquare,targetSquare)
      if (promote) return false;
    }

    let move = null;
    const gameCopy = { ...game }; // copy game
    move = gameCopy.move({ // attempt to make move
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });
    // if invalid, setMoveFrom and getMoveOptions
    if (move == null) {
      return false;
    }

    if (move.flags === "c") {
      //captureSound.play();
      sound.capture.play();
    } else {
      //moveSound.play();
      sound.move.play();
    };

    setGame(gameCopy);

    if (move == null) return false; // illegal move
    validateMove(sourceSquare, targetSquare);
    setMoveSquares({
      [sourceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      [targetSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" }
    });

    return true;
  }

  // VALIDATION

  function validateMove(sourceSquare, targetSquare) {
    let move = sourceSquare + targetSquare;
    // console.log({correctMove:correctMove, sourceSquare:sourceSquare, targetSquare:targetSquare})
    // console.log({prevCorrect: prevCorrect})
    let correct ="";

    if (correctMove.length === 5) {
      correct = correctMove.substring(0, 4);
    } else if ((prevCorrect != null) && prevCorrect.length === 5 && props.promotion !== "x") {
      correct = prevCorrect.substring(0, 4);
    } 

    if ((move === correctMove || move === correct) & (opposingMove != null)) {
      setTimeout(makeOpposingMove, 400); //
    } else if (move === correctMove || move === correct) {
      outcomeCallback(true);
      //setTimeout(makeOpposingMove, 600);
    } else if (game.in_checkmate()) { 
      outcomeCallback(true);
    } else {
      outcomeCallback(false);
      // color incorrect square?
    }
    return;
  }

  function onPieceClick(selectedPiece) {
    //console.log(selectedPiece)
    setPiece(selectedPiece);
  }

  // function onPieceDrop(piece) {
  //   setPiece(piece);
    
  // }

  // OPPOSING MOVE

  function makeOpposingMove() {
    // console.log({ opposingMove: opposingMove });
    if (opposingMove == null) return;

    let from = opposingMove.substring(0, 2);
    let to = opposingMove.substring(2, 4);
    let promotion = opposingMove.substring(4);

    outcomeCallback(true);
    // console.log({ from: from, to: to });
    safeGameMutate((game) => {
      let move = game.move({ from: from, to: to, promotion: promotion });
      if (move == null) return;
      if (move.flags === "c") { 
        //captureSound.play();
        sound.capture.play();
      } else {
        //moveSound.play();
        sound.move.play();
      }
      return move;
    });
  }

  // PROMOTION

  function checkPromotion(from, to) {
    const moves = game.moves({verbose: true});
    for (let i = 0, len = moves.length; i < len; i++) {
        if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from && moves[i].to === to) {
          setPendingMove([from,to]);
          displayPromotionSelection();
          return true;
        }
    }
    return false;
  }

  const handlePromotion = e => {
    const from = pendingMove[0];
    const to = pendingMove[1];
    game.move({from, to, promotion:e})
    validateMove(from, to, true);
    setPromotion("x")
  }

  const displayPromotionSelection = () => {
    setOpenModal(true);
  }

  const handlePromotionSelection = (e) => {
    setPromotion(e);
    setOpenModal(false);
  }

  // GRAPHICS

  // function onMouseOverSquare(square) {
  //   getMoveOptions(square);
  // }

  // // Only set squares to {} if not already set to {}
  // function onMouseOutSquare() {
  //   if (piece !== "") return;
  //   if (Object.keys(optionSquares).length !== 0) setOptionSquares({});
  // }

  function onSquareRightClick(square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  useEffect(() => {
    if (game == null) return; // game not loaded yet
    if (game.in_check()) {
      //console.log('in check')
      let square = getInCheckSquare();
      const newSquares = {};
      newSquares[square] = { background: "radial-gradient(circle, rgba(255,0,0,.8) 45%, transparent)" };
      
      setInCheckSquare(newSquares);
    } else if (!game.in_check() && inCheckSquare !== {}) {
      setInCheckSquare({}); // reset in check square
    }
  },[game])


  function getInCheckSquare() {

    let turn = game.turn(); // returns "w" or "b"

    // loop through ranks and files and concatenate to get square
    let files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let square = "";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = game.get(files[j] + ranks[i]);
        if (piece == null) continue;
        if (piece.color === turn && piece.type === "k") {
          square = files[j] + ranks[i];
          return square;
        }
      }
    }
  }

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true
    });
    if (moves.length === 0) {
      return;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%"
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)"
    };
    setOptionSquares(newSquares);
    setMoveHighlightSquare(square);
  }




  if (loaded) {
  return (
    <>
    <PromotionalModal openModal={openModal} onPromotionSelection={handlePromotionSelection} />
    <Chessboard
      position={game.fen()}
      onPieceDrop={onPieceDrop}
      boardOrientation={orientation}
      areArrowsAllowed={true}
      arePremovesAllowed={true}
      onPieceClick={onPieceClick}
      onSquareClick={onSquareClick}
      onSquareRightClick={onSquareRightClick}
      // onMouseOverSquare={onMouseOverSquare}
      // onMouseOutSquare={onMouseOutSquare}
      customSquareStyles={{
        ...moveSquares,
        ...optionSquares,
        ...rightClickedSquares,
        ...inCheckSquare
      }}
      boardWidth={width}
      animationDuration={200}
    />
    </>
  );
    } else {
      return null;
    }
}