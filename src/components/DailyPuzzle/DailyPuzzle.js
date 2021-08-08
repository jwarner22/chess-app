import React from "react";
import { DailyPuzzleContainer, DailyPuzzleTitle, DailyPuzzleWrapper } from "./DailyPuzzleElements";
import PopUp from "./Modal"; 


export default class DailyPuzzle extends React.Component {
  state = {
    //change this to true when the Puzzle Page is done.
   seen: false
   };
  togglePop = () => {
   this.setState({
    seen: !this.state.seen
   });
  };
render() {
  return (
    <>
   <div>
    {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
   </div>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        <DailyPuzzleTitle>
          Daily Puzzles
        </DailyPuzzleTitle>
      </DailyPuzzleContainer>
   </DailyPuzzleWrapper>
   </>
  );
 }
}

