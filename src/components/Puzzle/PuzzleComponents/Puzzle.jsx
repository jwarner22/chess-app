import React from "react";
import PropTypes from "prop-types";
// import { Chess } from "chess.js";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
// import BackgroundEvaluation from "./Stockfish";
import moveSound from "../../../assets/public_sound_standard_Move.mp3";
import captureSound from "../../../assets/public_sound_standard_Capture.mp3";
import {Howl} from 'howler';
import { useMemo } from "react";

// BackgroundEvaluation();
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;


// const Chess = require("chess.js");

export default class Puzzle extends React.Component {
  static propTypes = { children: PropTypes.func };

  constructor(props) {
    super(props);
    this.displayOutcome = props.displayOutcome;
    this.isCorrect = false;
    this.isFinished = false;
    this.moveSound = new Howl({src: moveSound});
    this.captureSound = new Howl({src: captureSound});
    this.retry = props.retry;
  }

  state = {
    fen: "",
    movable: {},
    pendingMove: [],
    selectVisible: "",
    lastMove: [],
    turnColor: "",
    orientation: "",
    correctMoves: [],
    correctTarget: "",
    correctSource: "",
    puzzleFinished: false,
    moveIndex: 0,
    check: false,
    prevMoveIndex: 0
  };

  componentDidMount() {
    this.newPuzzle();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.isFinished = false;
      this.count = this.props.count;
      this.newPuzzle();
    }
    if (prevProps.retry === false && this.props.retry === true) {
      this.isFinished = false;
      this.count = this.props.count;
      this.newPuzzle()
    }
  }

  retryPuzzle = () => {
    this.game.load(this.props.fen);
    this.setState({
      fen: this.game.fen(), //,
      orientation: this.turnColor(),
      check: this.game.in_check()
    });
  }

  newPuzzle = async () => {
    // refactor to show opposing move by setting state, waiting, making opposing move, and then resetting state (previously introduced some issues)
    if (this.count){
      await wait(250);
    }

    this.game.load(this.props.fen);
    this.game.move({
      from: this.props.correctMoves[0],
      to: this.props.correctMoves[1]
    });
    this.setState({
      fen: this.game.fen(), //,
      orientation: this.turnColor(),
      correctMoves: this.props.correctMoves,
      correctTarget: this.props.correctMoves[3],
      correctSource: this.props.correctMoves[2],
      moveIndex: 2,
      check: this.game.in_check()
    });
    if (this.count) {
      this.calcMovable(true)
    }
  };

  makeMove = async (from, to) => {
    await wait(350);
    this.game.move({
      from: from,
      to: to,
      promotion: 'q'
    });
  };

  // runs on player move
  onMove = async (from, to) => {
    // check if puzzle is finished
    if (this.game.move({to:to, from:from, verbose: true}).flags === 'c') {
      this.playSound('c')
    } else {
      this.playSound('n')
    }
    // || this.isFinished === true (removed for auto next puzzle (not needed))
    if (
      this.state.moveIndex >= this.state.correctMoves.length
    ) {
      this.isFinished = false;
      return;
    }
    // extracts legal moves
    //const moves = this.game.moves({ verbose: true });

    /*
    // loops through each square
    for (let i = 0, len = moves.length; i < len; i++) {
      // eslint-disable-line 
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        this.setState({
          pendingMove: [from, to],
          selectVisible: true
        });
        return;
      }
    }
    */
    
    // make move on board before proceeding
    // await this.makeMove(from, to);
    // set new game state
    const lastMove = from + to;
 
    // checks move for correctness and displays splash screen.
    this.verifyMove(from, to);

    if (this.isCorrect) {
    // set game state
    let moveIndex = this.state.moveIndex;
    this.setState({
      fen: this.game.fen(),
      lastMove: [lastMove],
      turnColor: this.turnColor(),
      check: this.game.in_check(),
      moveIndex: moveIndex + 2,
      correctSource: this.state.correctMoves[moveIndex + 4],
      correctTarget: this.state.correctMoves[moveIndex + 5]
    });

    // check if end of puzzle or play opposing move
    if (this.state.moveIndex < this.state.correctMoves.length) {
      await this.makeMove(
        this.state.correctMoves[this.state.moveIndex],
        this.state.correctMoves[this.state.moveIndex + 1]
      );
      this.setState({
        fen: this.game.fen(),
        lastMove: [lastMove],
        turnColor: this.turnColor(),
        moveIndex: this.state.moveIndex + 2,
        check: this.game.in_check()
      });
    } else {
      // unlocks next button
      this.unlockNext();
      if (this.isCorrect === true) {
        this.displayOutcome(true);
      }
    }
    }
  };

  // verify correct move
  verifyMove = (from, to) => {
    // set correct move
    const correctTarget = this.state.correctTarget;
    const correctSource = this.state.correctSource;

    // check correct move
    if ((to !== correctTarget) | (from !== correctSource)) {
      this.unlockNext();
      this.displayOutcome(false); // success is false
      this.isCorrect = false;
      this.isFinished = true;
    } else {
      this.isCorrect = true;
      this.isFinished = false;
    }
  };

  playSound = (moveType) => {
    // Howler.volume(1.0)
    if (moveType === 'c') {
      this.captureSound.play()

    } else if (moveType === 'n') {
      this.moveSound.play()
    }

  }

  unlockNext = () => {
    this.props.unlockNext();
  };

  // calcs legal moves and returns chessground compatible object
  calcMovable = next => {
    if (this.state.moveIndex !== this.state.prevMoveIndex | this.state.prevMoveIndex === 0 | next) {
      this.game = new Chess(this.state.fen);
    const dests = new Map();
    this.game.SQUARES.forEach((s) => {
      const ms = this.game.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });
    this.setState({...this.state, prevMoveIndex: this.state.moveIndex, dests: dests})
    return {
      free: false,
      dests,
      color: this.turnColor() // "white"
    };
  } else {
    return  {
      free: false,
      dests: this.state.dests,
      color: this.turnColor()
    }
  }
  };


  // returns color of current turn
  turnColor = () => {
    return this.game.turn() === "w" ? "white" : "black";
  };

  // render function
  render() {
    const movable = this.calcMovable(false);
    return this.props.children({
      movable: movable,
      fen: this.state.fen,
      turnColor: movable.color,
      lastMove: this.state.lastMove,
      onMove: this.onMove,
      orientation: this.state.orientation,
      check: this.state.check
    });
  }
}
