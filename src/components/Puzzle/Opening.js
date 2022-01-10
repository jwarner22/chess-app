import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { wait } from './Utilities/helpers.js';
import DemoMoves from "./Opening/DemoMoves.jsx";
import Opening from "./Opening/Opening.jsx";
import {getOpeningMoves} from './Utilities/helpers.js';
import Progress, { BackButtonWrapper } from './Utilities/Progress.jsx';
import OpeningNav from './Opening/OpeningNav.js';
import correctSound from "../../assets/public_sound_standard_Confirmation.mp3";
import incorrectSound from "../../assets/public_sound_standard_Error.mp3";
import styled from "styled-components";
import {Howl} from 'howler'
import { Padding, Score, SettingsBackupRestore } from "@styled-icons/material";
import {PuzzlePageContainer, PuzzlePageWrapper, PuzzlePageGrid, PuzzleBoardContainer, PuzzleBoardWrapper, RightPuzzlePanelContainer, PercentCompleted} from "../Puzzle/PuzzleComponents/PuzzlePage"
import {MobileHeaderContainer, MobilePuzzleWrapper} from "../Puzzle/PuzzleComponents/MobilePuzzle/MobilePuzzleElements"
import BackButton from "../BackButton.js";
import { CreativeCommonsNoncommercialEu } from "@styled-icons/entypo";

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
  const [retryDisabled, setRetryDisabled] = useState(true);
  const [showDisabled, setShowDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const [windowDimension, setWindowDimension] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [startedDemo, setStartedDemo] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const incorrectSoundPlayer = new Howl({src: incorrectSound});
  const correctSoundPlayer = new Howl({src: correctSound});

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;
  
  useEffect(() => {
    getMoves();
  }, []);

  useEffect(() => {
    if (count === 3) {
      props.toggleFinished(score);
    }
  },[count])

  const getMoves = async () => {
    let moves = props.openingData.moves;
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
    setDemoIsFinished(true);
  };

  const playSound = async (type) => {
    if (type === 'correct') {
      return correctSoundPlayer.play();
    } else {
      return incorrectSoundPlayer.play();
    }
  }

  const incorrectCallback = async (currentFen, moveIndex) => {
    await playSound('incorrect');
    setRetryDisabled(prev => !prev);
    setShowDisabled(prev => !prev);
    setScore(prev => prev - 200);
    setOutcome(() => false);
  };

  const finishedCallback = async () => {
    await playSound('correct');
    setProgress(prevProgress => prevProgress + ((1/3)*100.01));
    setContinueDisabled(false);
    setScore(prev => prev + 100*(Math.floor(moves.length/2)));
    setOutcome(() => true);
  }

  const returnPercent = (percent) => {
    //setProgress(percent)
  }

  const startDemo = () => {
    setStartedDemo(true);
  }

  const handleRetryClick = () => {
    //setDemoIsFinished(false);
    setTriggerNext(prev=>!prev);
    setRetryDisabled(true);
    setShowDisabled(true);
  };

  const handleContinueClick = () => {
    setCount(count => count + 1);
    setContinueDisabled(true);
  }
  
  const handleShowMovesClick = () => {
    setDemoIsFinished(false);
    setShowDisabled(true);
    setRetryDisabled(true);
  }

  if (isLoaded) {
    return (
      <>
      <PuzzlePageContainer>
        {isMobile ? ( <>
          <MobilePuzzleWrapper>
            <BackButtonWrapper>
              <BackButton />
            </BackButtonWrapper>
            <MobileHeaderContainer>
              <Header>{props.openingData.headline}</Header> 
            </MobileHeaderContainer>
            <div style={progressContainer}>
        <Progress returnPercent={returnPercent} outcome={outcome} percent={progress} count={count}  />
        </div>
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
                        startedDemo={startedDemo}
                      />
                    )}
                    {isLoaded === true && demoIsFinished === true && (
                      <Opening triggerNext={triggerNext}  count={count} moves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} orientation={orientation} />
                    )}
                  </div>
                  </div>
              </div>
            </PuzzleBoardWrapper>
            <OpeningNav onShowMovesClick={handleShowMovesClick} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} retryDisabled={retryDisabled} continueDisabled={continueDisabled} demoIsFinished={demoIsFinished} startDemo={startDemo} startedDemo={startedDemo} showDisabled={showDisabled}/>
          </MobilePuzzleWrapper>
          </>
        ) : (
          <>
          <BackButtonWrapper>
            <BackButton />
          </BackButtonWrapper>
          <PuzzlePageWrapper>
            <PuzzlePageGrid>
      <PuzzleBoardContainer>
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
                startedDemo={startedDemo}
              />
            )}
            {isLoaded === true && demoIsFinished === true && (
              <Opening triggerNext={triggerNext} count={count} moves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} orientation={orientation} />
            )}
          </div>
          </div>
        </div>
        </PuzzleBoardWrapper>
        </PuzzleBoardContainer>
        <RightPuzzlePanelContainer>
          <HeaderContainer>
          <Header>{props.openingData.headline}</Header>
        </HeaderContainer>
        <div style={progressContainer}>
        <Progress returnPercent={returnPercent} outcome={outcome} percent={progress} count={count} />
        <PercentCompleted>{Math.trunc(progress)}/100</PercentCompleted>
        </div>
        <OpeningNav onShowMovesClick={handleShowMovesClick}  onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} retryDisabled={retryDisabled} continueDisabled={continueDisabled} demoIsFinished={demoIsFinished} startDemo={startDemo} startedDemo={startedDemo} showDisabled={showDisabled}/>
        </RightPuzzlePanelContainer>
        </PuzzlePageGrid>
        </PuzzlePageWrapper>
        </>
        )}
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
  marginTop: 16,
  marginBottom: 24
};
const progressContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 16,
  marginBottom: 24
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
  color: rgba(255,255,255,0.8);
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`

// const PuzzlePageContainer = styled.div `
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   grid-template-rows: min-content 1fr min-content;
//   width: 100% !important;
//   grid-gap: 24px;
//   top: 0;
//   padding: 24px 16px;
//   position: absolute;
//   overflow: hidden;
//   `

// const PuzzleBoardWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `