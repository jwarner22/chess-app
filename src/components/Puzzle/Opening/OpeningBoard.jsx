import React from "react";
import Opening from "./Opening";
import Chessground from "../Puzzle/Chessground";
import PropTypes from "prop-types";

export default class OpeningBoard extends React.Component {
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
    console.log("rendered openingboard");
    return (
      <div style={boardsContainer}>
        <div className="box">
          <div className="main-board green merida my-2">
            <Opening
              fen={this.props.fen}
              correctMoves={this.state.correctMoves}
              unlockNext={this.props.unlockNext}
              count={this.props.count}
              displayOutcome={this.props.displayOutcome}
            >
              {({ movable, fen, turnColor, lastMove, onMove, orientation }) => (
                <Chessground
                  movable={movable}
                  fen={fen}
                  turnColor={turnColor}
                  lastMove={lastMove}
                  onMove={onMove}
                  orientation={orientation}
                />
              )}
            </Opening>
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
