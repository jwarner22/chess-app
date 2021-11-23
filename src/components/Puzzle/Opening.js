import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { wait } from './Utilities/helpers.js';
import DemoMoves from "./Opening/DemoMoves.jsx";
import Opening from "./Opening/Opening.jsx";
import {getOpeningMoves} from './Utilities/helpers.js';
import Progress from './Utilities/Progress.jsx';
import OpeningNav from './Opening/OpeningNav.js';
import correctSound from "../../assets/public_sound_standard_Confirmation.mp3";
import incorrectSound from "../../assets/public_sound_standard_Error.mp3";
import styled from "styled-components";
import {Howl} from 'howler'
import { Score, SettingsBackupRestore } from "@styled-icons/material";


export default function OpeningModule(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoIsFinished, setDemoIsFinished] = useState(false);
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [progress,setProgress] = useState(0);
  const [count,setCount] = useState(0);
  const [moves,setMoves] = useState();
  const [orientation, setOrientation] = useState("");
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [showDisabled, setShowDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const incorrectSoundPlayer = new Howl({src: incorrectSound});
  const correctSoundPlayer = new Howl({src: correctSound});
  
  useEffect(() => {
    getMoves();
  }, []);

  useEffect(() => {
    if (count === 3) {
      props.toggleFinished(score);
    }
  },[count])

  const getMoves = () => {
    let moves = props.openingsData.moves;
    console.log({moves:moves})
    const openingMoves = getOpeningMoves(moves);
    setMoves(openingMoves)
    setFen(openingMoves[0].fen);
    setMoveIndex(0);
    setProgress(0);
    setCount(0);
    setOrientation("white");
    setIsLoaded(true);
  }

  const demoFinished = () => {
    console.log("demo finished");
    setDemoIsFinished(true);
  };

  const incorrectCallback = async (currentFen, moveIndex) => {
    //setFen(currentFen);
    //setMoveIndex(moveIndex);
    setShowDisabled(prev => !prev);
    incorrectSoundPlayer.play();
    setScore(prev => prev - 200);
  };

  const finishedCallback = async () => {
    correctSoundPlayer.play();
    setProgress(progress + ((1/3)*100));
    setContinueDisabled(false);
    setScore(prev => prev + 100*(Math.floor(moves.length/2)));
  }

  const returnPercent = (percent) => {
    //setProgress(percent)
  }

  const handleShowClick = () => {
    console.log("show clicked");
    setDemoIsFinished(false);
    setShowDisabled(true);
  };

  const handleContinueClick = () => {
    console.log("continue clicked");
    setCount(count => count + 1);
    setContinueDisabled(true);
  }

  if (isLoaded) {
    return (
      <>
      <PuzzlePageContainer>
        <HeaderContainer>
        <Header>{props.openingsData.headline}</Header>
        </HeaderContainer>
      <div style={progressContainer}><Progress returnPercent={returnPercent} percent={progress} count={count} /></div>
        <PuzzleBoardWrapper>
        <div style={boardContainer}>
        <div className="box">
          <div className="main-board green merida my-2">
            {isLoaded === true && demoIsFinished === false && (
              <DemoMoves
                moves={moves}
                demoFinished={demoFinished}
                fen={fen}
                moveIndex={moveIndex}
                orientation={orientation}
              />
            )}
            {isLoaded === true && demoIsFinished === true && (
              <Opening count={count} moves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} orientation={orientation} />
            )}
          </div>
          </div>
        </div>
        </PuzzleBoardWrapper>
        <OpeningNav onShowClick={handleShowClick} onContinueClick={handleContinueClick} showDisabled={showDisabled} continueDisabled={continueDisabled}/>
        </PuzzlePageContainer>
      </>
    );
  }
  return null;

}

const boardContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 24,
  marginBottom: 30,
  position: 'relative',
  zIndex: 0
};
const progressContainer = {
  margin: "0 auto",
  width: "40%",
  minWidth: "320px"

};
// const progressContainer = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexWrap: "wrap",
//   margin: "0 auto",
//   maxWidth: "1080px"
// };

const Header = styled.h2`
  color: #afafaf;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const PuzzlePageContainer = styled.div `
  display: flex;
  flex-direction: column;
  height: 100vh;
  grid-template-rows: min-content 1fr min-content;
  width: 100% !important;
  grid-gap: 24px;
  top: 0;
  padding: 24px 16px;
  position: absolute;
  overflow: hidden;
  `

const PuzzleBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`