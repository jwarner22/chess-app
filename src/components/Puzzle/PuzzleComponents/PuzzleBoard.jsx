import React from "react";
import Puzzle from "./Puzzle";
import Chessground from "../Chessground";
import PropTypes from "prop-types";

export default class PuzzleBoard extends React.Component {
  static propTypes = { fen: PropTypes.string };

  state = {
    fen: this.props.fen,
    correctMoves: this.props.correctMoves
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        fen: this.props.fen,
        correctMoves: this.props.correctMoves
      });
    }
  }

  render() {
    console.log("rendered puzzleboard");
    return (
      <div style={boardsContainer}>
        <div className="box">
          <div className="main-board green merida my-2">
            <Puzzle
              fen={this.props.fen}
              correctMoves={this.state.correctMoves}
              unlockNext={this.props.unlockNext}
              count={this.props.count}
              displayOutcome={this.props.displayOutcome}
            >
              {({ movable, fen, turnColor, lastMove, onMove, orientation, check }) => (
                <Chessground
                  movable={movable}
                  fen={fen}
                  turnColor={turnColor}
                  lastMove={lastMove}
                  onMove={onMove}
                  orientation={orientation}
                  check={check}
                />
              )}
            </Puzzle>
          </div>
        </div>
      </div>
    );
  }
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
