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
import { Time } from "@styled-icons/boxicons-regular";

// BackgroundEvaluation();
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;


// const Chess = require("chess.js");

export default class Puzzle extends React.Component {
  static propTypes = { children: PropTypes.func };
  
  constructor(props) {
    super(props);
    this.displayOutcome = props.displayOutcome;
    this.onPromotion = props.onPromotion;
    this.moveIndicator = props.moveIndicator
    this.isCorrect = false;
    this.isFinished = false;
    this.moveSound = new Howl({src: moveSound});
    this.captureSound = new Howl({src: captureSound});
    this.retry = props.retry;
  }

  state = {
    fen: this.props.fen,
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
    prevMoveIndex: 0,
    dests: {}
  };

  componentDidMount() {
    this.game = new Chess(this.props.fen);
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
    if (prevProps.promotion !== this.props.promotion && this.props.promotion !== "x") {
      this.promotion(this.props.promotion)
    }
  }

  retryPuzzle = () => {
    this.game.load(this.props.fen);
    this.setState({
      fen: this.game.fen(), //,
      orientation: this.turnColor(),
      turnColor: this.turnColor(),
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
    console.log('set state')
    this.setState({
      fen: this.game.fen(), //,
      orientation: this.turnColor(),
      turnColor: this.turnColor(),
      correctMoves: this.props.correctMoves,
      correctTarget: this.props.correctMoves[3],
      correctSource: this.props.correctMoves[2],
      moveIndex: 2,
      check: this.game.in_check(),
      movable: this.calcMovable(true),
    });
    
    if (this.count) {
      //this.calcMovable(true)
    }

    let moveColor = this.turnColor()
    this.moveIndicator(moveColor);
    
  };

  makeMove = async (from, to) => {
    await wait(500);
    await this.playMoveSound(from, to);
    // check for promotion
    let promotion = "q"
    if (to.length > 2) {
      promotion = to.substring(2)
      to = to.substring(0,2)
    }

    this.game.move({
      from: from,
      to: to,
      promotion: promotion
    });

    this.setState({
      fen: this.game.fen(),
      lastMove: [from,to],
      turnColor: this.turnColor(),
      moveIndex: this.state.moveIndex + 2,
      check: this.game.in_check(),
      movable: this.calcMovable(true),
    })
  };

  promotion = async e => {
    const from = this.pendingMove[0];
    const to = this.pendingMove[1];
    const lastMove = from + to;

    this.game.move({from, to, promotion:e})
    this.setState({
      fen: this.game.fen(),
      lastMove: [from,to],
    })

    await this.verifyMove(from, to, true);

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
  }

  playMoveSound = async (from, to) => {
    // play sounds
    if (this.game.move({to:to, from:from, verbose: true}).flags === 'c') {
      this.playSound('c')
    } else {
      this.playSound('n')
    }
  }

  // runs on player move
  onMove = async (from, to) => {
    // check for pawn promotion
    const moves = this.game.moves({verbose: true});
    for (let i = 0, len = moves.length; i < len; i++) {
        if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
          this.pendingMove = [from,to];
          this.onPromotion()
          return
        }
    }
    
    await this.playMoveSound(from, to);

    const lastMove = from + to;
 
    // checks move for correctness and displays splash screen.
    await this.verifyMove(from, to, false);

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
      this.makeMove(
        this.state.correctMoves[this.state.moveIndex],
        this.state.correctMoves[this.state.moveIndex + 1]
      );

    } else {
      // unlocks next button
      this.unlockNext();
      this.setState({
        movable: {      
          free: false,
          dests: new Map(),
          color: this.turnColor()}
      })
      if (this.isCorrect === true) {
        this.displayOutcome(true);
      }
    }
    }
  };
  
  // verify correct move
  verifyMove = async (from, to, promotion) => {

    if (promotion) {
      if (this.props.promotion === this.state.correctTarget.substring(2)) {
        this.isCorrect = true;
        this.isFinished = false;
        return
      }
    }

    if (this.game.in_checkmate()) {
      this.isCorrect = true;
      this.isFinished = true;
      return
    }

    // set correct move
    const correctTarget = this.state.correctTarget;
    const correctSource = this.state.correctSource;

    // check correct move
    if ((to !== correctTarget) | (from !== correctSource)) {
      this.unlockNext();
      this.displayOutcome(false); // success is false
      this.isCorrect = false;
      this.isFinished = true;
      this.setState({
        movable: {
          free: false,
          dests: new Map(),
          color: this.turnColor()
        }
      });
    } else {
      this.isCorrect = true;
      this.isFinished = false;
    }
  };

  playSound = async (moveType) => {
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
      //this.game = new Chess(this.state.fen);
      console.log('calced movable')
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
    //const movable = this.calcMovable(false);
    return this.props.children({
      movable: this.state.movable,
      fen: this.state.fen,
      turnColor: this.state.turnColor,
      lastMove: this.state.lastMove,
      onMove: this.onMove,
      orientation: this.state.orientation,
      check: this.state.check
    });
  }
}
