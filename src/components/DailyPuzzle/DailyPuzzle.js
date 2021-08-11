import React, {Link} from "react";
import { DailyPuzzleContainer, 
  DailyPuzzleTitle, 
  DailyPuzzleWrapper, 
  DailyPuzzleHeaderImg,
  PuzzleWrapper,
  Container} from "./DailyPuzzleElements";
import Modal from "./Modal"; 
import headerImg from "./../../Images/DailyPuzzleHeaderImg.svg"
import DailyPuzzleModuleContainer from "./DailyPuzzleModuleContainer"
import {DailyPuzzleModules} from "./DailyPuzzleData"

export default class DailyPuzzle extends React.Component {
  state = {
    //change this to true when the Puzzle Page is done.
   seen: true
   };
  togglePop = () => {
   this.setState({
    seen: !this.state.seen
   });
  };
render() {
  console.log(this.state.seen)
  return (
    <>
   <div> 
    {this.state.seen ? <Modal toggle={this.togglePop} /> : null}
   </div>
   <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Daily Puzzles
        </DailyPuzzleTitle>
        </DailyPuzzleContainer>
        <PuzzleWrapper>
        <DailyPuzzleModuleContainer/>
        <DailyPuzzleModuleContainer/>
        <DailyPuzzleModuleContainer/>
        </PuzzleWrapper>
   </DailyPuzzleWrapper>
   </Container>
   </>
  );
 }
}

