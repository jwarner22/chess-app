import React, { useEffect, useState } from "react";
import DemoMoves from "./Opening/DemoMoves.jsx";
//import Opening from "./Opening/Opening.jsx";
import Opening from "./Opening/OpeningPuzzleManager";
import {getOpeningMoves} from './Utilities/helpers.js';
import Progress, { BackButtonWrapper } from './Utilities/Progress.jsx';
import OpeningNav from './Opening/OpeningNav.js';
import correctSound from "../../assets/public_sound_standard_Confirmation.mp3";
import incorrectSound from "../../assets/public_sound_standard_Error.mp3";
import styled from "styled-components";

import {Howl} from 'howler'
import {PuzzlePageContainer, 
  PuzzlePageWrapper, 
  PuzzlePageGrid, 
  PuzzleBoardContainer, 
  PuzzleBoardWrapper, 
  RightPuzzlePanelContainer, 
  PercentCompleted} from "../Puzzle/PuzzleComponents/PuzzlePage"
import {MobileHeaderContainer, 
  MobilePuzzleWrapper} from "../Puzzle/PuzzleComponents/MobilePuzzle/MobilePuzzleElements"
import BackButton from "../BackButton.js";
import {useWindowSize} from '../Hooks/UseWindowSize';

export default function OpeningModule(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoIsFinished, setDemoIsFinished] = useState(false);
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [progress,setProgress] = useState(0);
  const [count,setCount] = useState(0);
  const [moves,setMoves] = useState();
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [retryDisabled, setRetryDisabled] = useState(true);
  const [showDisabled, setShowDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [startedDemo, setStartedDemo] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  const incorrectSoundPlayer = new Howl({src: incorrectSound});
  const correctSoundPlayer = new Howl({src: correctSound});


  const windowSizeWidth = useWindowSize()[0];
  const [width, setWidth] = useState(windowSizeWidth);
  const isMobile = windowSizeWidth <= 640;

  const orientation = props.orientation;

  
  useEffect(() => {
    getMoves();
  }, []);

  useEffect(() => {
    if (count === 3) {
      setTimeout(props.toggleFinished(score), 3000);
    }
  },[count])

    // manage board resize
    useEffect(() => {
      if (windowSizeWidth < 640){
        setWidth(windowSizeWidth)
      } else if (windowSizeWidth > 640 && windowSizeWidth < 1300){
          setWidth(window.innerWidth / 2)
      } else if (windowSizeWidth >= 1300) {
          setWidth(650)
      }
    }, [windowSizeWidth])

  const getMoves = async () => {
    let moves = props.openingData.moves;
    const openingMoves = getOpeningMoves(moves);
    setMoves(openingMoves)
    setFen(openingMoves[0].fen);
    setMoveIndex(0);
    setProgress(0);
    setCount(0);
    setIsLoaded(true);
  }

  const demoFinished = () => {
    setDemoIsFinished(true);
  };

  const playSound = async (type) => {
    if (type === 'correct') {
      correctSoundPlayer.play();
    } else {
      incorrectSoundPlayer.play();
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
    setTriggerNext(prev=>!prev);
    setRetryDisabled(true);
    setShowDisabled(true);
    setBoardKey(prev => prev + 1);
  };

  const handleContinueClick = () => {
    setCount(count => count + 1);
    setContinueDisabled(true);
    setBoardKey(prev => prev + 1);
  }
  
  const handleShowMovesClick = () => {
    setDemoIsFinished(false);
    setShowDisabled(true);
    setRetryDisabled(true);
    setBoardKey(prev => prev + 1);
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
                {/* <div className="box">
                  <div className="main-board green merida my-2"> */}
                    {isLoaded === true && demoIsFinished === false && (
                      <DemoMoves
                      key={boardKey}
                        moves={moves}
                        demoFinished={demoFinished}
                        fen={fen}
                        moveIndex={moveIndex}
                        orientation={orientation}
                        startedDemo={startedDemo}
                      />
                    )}
                    {isLoaded === true && demoIsFinished === true && (
                      <Opening key={boardKey} orientation={orientation} triggerNext={triggerNext}  count={count} correctMoves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} orientation={orientation} />
                    )}
                  {/* </div>
                  </div> */}
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
        {/* <div className="box">
          <div className="main-board green merida my-2"> */}
            {isLoaded === true && demoIsFinished === false && (
              <DemoMoves
              key={boardKey}
                moves={moves}
                demoFinished={demoFinished}
                fen={fen}
                moveIndex={moveIndex}
                orientation={orientation}
                startedDemo={startedDemo}
              />
            )}
            {isLoaded === true && demoIsFinished === true && (
              <Opening key={boardKey} orientation={orientation} triggerNext={triggerNext} count={count} correctMoves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} boardWidth={width} />
            )}
          {/* </div>
          </div> */}
        </div>
        </PuzzleBoardWrapper>
        </PuzzleBoardContainer>
        <RightPuzzlePanelContainer>
          <HeaderContainer>
          <Header>{props.openingData.headline}</Header>
        </HeaderContainer>
        <div style={progressContainer}>
        <Progress returnPercent={returnPercent} outcome={outcome} percent={progress} count={count} />
        <PercentCompleted>{Math.trunc(progress)}%</PercentCompleted>
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
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: 24,
  paddingBottom: 24,
  width: "80%",
  margin: "auto"
};;

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
