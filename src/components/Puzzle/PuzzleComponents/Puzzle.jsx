import React from "react";
import PropTypes from "prop-types";
// import { Chess } from "chess.js";
import * as ChessJS from "chess.js";
import { wait } from "../Utilities/helpers.js";
// import BackgroundEvaluation from "./Stockfish";
import moveSound from "../../../assets/public_sound_standard_Move.mp3";
import captureSound from "../../../assets/public_sound_standard_Capture.mp3";
import {Howl} from 'howler';

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
    this.captureSound = new Howl({src: captureSound})
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
    check: false
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
  }

  newPuzzle = async () => {
    // refactor to show opposing move by setting state, waiting, making opposing move, and then resetting state (previously introduced some issues)
    if (this.count !== 0){
      await wait(500);
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
  };

  makeMove = async (from, to) => {
    await wait(150);
    this.game.move({
      from: from,
      to: to
    });
  };

  // runs on player move
  onMove = async (from, to) => {
    // check if puzzle is finished
    // await this.playSound();
    if (this.game.move({to:to, from:from, verbose: true}).flags === 'c') {
      await this.playSound('c')
    } else {
      await this.playSound('n')
    }
    // || this.isFinished === true (removed for auto next puzzle (not needed))
    if (
      this.state.moveIndex >= this.state.correctMoves.length
    ) {
      this.isFinished = false;
      return;
    }
    // extracts legal moves
    const moves = this.game.moves({ verbose: true });

    // loops through each square
    for (let i = 0, len = moves.length; i < len; i++) {
      /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        this.setState({
          pendingMove: [from, to],
          selectVisible: true
        });
        return;
      }
    }

    // make move on board before proceeding
    await this.makeMove(from, to);
    // set new game state
    const lastMove = from + to;

    // checks move for correctness and displays splash screen.
    this.verifyMove(from, to);
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
    console.log('sound played')
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
  calcMovable = () => {
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
    return {
      free: false,
      dests,
      color: this.turnColor() // "white"
    };
  };

  // returns color of current turn
  turnColor = () => {
    return this.game.turn() === "w" ? "white" : "black";
  };

  // render function
  render() {
    const movable = this.calcMovable();
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
