import { Component } from "react";

// const STOCKFISH = window.STOCKFISH;
const moves = ["e2e4", "d7d5", "g1f3", "b8a6"];
const evals = [];

class Stockfish extends Component {
  state = { fen: "start" };

  componentDidMount() {
    this.evaluate();
  }

  evaluate = () => {
    const options = {};
    //let evaler =
    // typeof STOCKFISH === "function"
    // ? STOCKFISH()
    // : new Worker(options.stockfishjs || "stockfish.js");
    let evaler = new Worker(options.stockfishjs || "stockfish.js");

    function uciCmd(cmd, engine) {
      // console.log('UCI: ' + cmd);
      engine.postMessage(cmd);
    }
    uciCmd("uci", evaler);
    let cumMoves = "";
    moves.forEach((move) => {
      cumMoves += " " + move;
      uciCmd("position startpos moves" + cumMoves, evaler);
      uciCmd("eval", evaler);
    });
    // uciCmd("position startpos moves" + " e2e4 d7d5 g1f3 b8a6", evaler);
    // uciCmd("eval", evaler);
    evaler.onmessage = function (event) {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
        console.log("evaler: " + line);
        if (line.substring(0, 1) === "T") {
          // console.log(line.substring(18, 22));
          evals.push(line.substring(18, 22));
        }
      } else {
        line = event;
      }
      if (evals.length === moves.length) {
        // alert(evals);
      }
      /// Ignore some output.
      if (
        line === "uciok" ||
        line === "readyok" ||
        line.substr(0, 11) === "option name"
      ) {
        return;
      }
    };
  };

  render() {
    return null;
  }
}

export default Stockfish;
