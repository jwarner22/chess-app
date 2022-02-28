import React, { useState, useEffect, useRef} from "react";

//import PuzzleBoard from "./PuzzleBoard";
import PuzzleBoard from "../PuzzleManager.js";
import ProgressBar from "../Utilities/Progress";

import {getMoves} from '../Utilities/helpers.js';
import confirmationSoundFile from "../../../assets/public_sound_standard_Confirmation.mp3";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
//import buttonSoundFile from "../../../assets/click_005.ogg";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav"
import styled from "styled-components"
import {Modules} from "../../../data/ModuleData"
import BlackIndicator from "./TurnIndicator/BlackIndicator"
import WhiteIndicator from "./TurnIndicator/WhiteIndicator"
import Lives from "./Lives/Lives"
import '../../../App.css'

// import PromotionalModal from "../../PostLogin/PromotionModal/PromotionalModal"
// import BackButton from "../../BackButton"
// import {BackButtonWrapper} from "../Utilities/Progress"

// import useDebugInformation from "../../Hooks/useDebugInformation";
// import useRenderCount from "../../Hooks/useRenderCount";

import { 
  MobilePuzzleWrapper, 
  MobileHeaderContainer, 
  MobileContent} from "./MobilePuzzle/MobilePuzzleElements";

import { useWindowSize } from "../../../hooks/UseWindowSize";
import Timer from "./Timer/Timer";

// import Stockfish from "./Stockfish";
// move functions to utils file


const getModuleTitle = (name) => {
  const module = Modules.find(module => module.type_ref === name)
  return module.headline
}

const sound = {
  confirmation: new Howl({src: [confirmationSoundFile]}),
  error: new Howl({src: [errorSoundFile]})
}

export default function PuzzlePage(props) {
  // useDebugInformation(PuzzlePage, props);
  // const renderCount = useRenderCount();
  const puzzleData = props.puzzles;

  const [moveColor, setMoveColor] = useState("")
  const [count, setCount] = useState(0);
  const [fen, setFen] = useState(puzzleData[0].fen);
  const [progress, setProgress] = useState(0);
  const [outcome, setOutcome] = useState(null)
  const [outcomes,setOutcomes] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [retry, setRetry] = useState(false);
  const [retryDisable, setRetryDisable] = useState(true);
  const [correctMoves, setCorrectMoves] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [promotion, setPromotion] = useState("x");
  const [startTime, setStartTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [toggleTimer, setToggleTimer] = useState(true);
  const [lives, setLives] = useState(3);
  // const [confirmationSound, setConfirmationSound] = useState(null);
  // const [errorSound, setErrorSound] = useState(null);
  const [boardKey, setBoardKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // const confirmationSound = new Howl({src: confirmationSoundFile})
  // const errorSound = new Howl({src: errorSoundFile})
  // const buttonSound = new Howl({src: buttonSoundFile})

  const windowDimensions = useWindowSize();
  const isMobile = windowDimensions[0] < 640;

  const title = getModuleTitle(props.theme)
  

  const boardRef = useRef();


  // set instances and cleanup to avoid memory leaks
  useEffect(() => {
    // setConfirmationSound(() => new Howl({src: confirmationSoundFile}));
    // setErrorSound(() => new Howl({src: errorSoundFile}));
    setCorrectMoves(() => getMoves(puzzleData[0].moves));
    setLoaded(true);
    return () => {
      if (sound.confirmation.playing()) sound.confirmation.stop();
      if (sound.error.playing()) sound.error.stop();

      // setConfirmationSound(() => null);
      // setErrorSound(() => null);
    }
  } , [])

  useEffect(() => {
    // checks if user has missed 4 puzzles - if so route to fialure screen
    let failureTimeout = null;

    if (outcomes.filter(entry => entry === false).length > 2) {
      failureTimeout = setTimeout(fail, 3000)
    }
    return () => clearTimeout(failureTimeout); // clear timout on unmount
  }, [outcomes]);

  useEffect(() => {
    if (progress < 100) {
      nextPuzzle();
    }
  }, [count])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(finished(), 2000);
    }
  }, [progress])

  useEffect(() => {
    if (lives < 0){
      setLives(0)
    }
  },[lives])

  // puzzle module is finished
  const finished = () => {
    props.puzzleIsFinished(outcomes, 'succeed', times);
  }

  // module failed
  const fail = () => {
    // await wait(1000)
    props.puzzleIsFinished(outcomes, 'fail', times)
  }

  // track next puzzle
  const nextPuzzle = () => {
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
  }

  const unlockNext = () => {
    setWaiting(true);
  };

  const playSound = (category) => {
    if (category === "confirmation") {
      console.log("confirmation sound")
      sound.confirmation.play();
    } else if (category === "error") {
      sound.error.play();
    } else  if (category === "button") {
      //return buttonSound.play();
    }
    return null;
  }

  const displayOutcome = (success) => {
    // end puzzle timer here
    setToggleTimer(prev => !prev)
    // play sound to indicate success or failure
    if (success) {
      playSound("confirmation");
      setRetryDisable(true)
      setCorrect(true)
    } else {
      playSound("error");
      setRetryDisable(false)
      setCorrect(false)
      setLives(prev => prev - 1)
    }
    setPromotion("x")
    setOutcome(success);
    setOutcomes(prevOutcomes => [...prevOutcomes, success]);
  };


  useEffect(() => {
    let now = Date.now();
    if (toggleTimer) {
      setStartTime(now)
    } else {
      setTimes(prevTimes => [...prevTimes, now - startTime])
    }
  },[toggleTimer])


  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  
  const returnPercent = (percent) => {
    setProgress(percent)
    if (percent >= 100) {
      finished()
    }
  }

  function handleContinueClick() {
    //playSound("button")
    incrementCount()
    setRetry(false)
    setWaiting(false)
    setRetryDisable(true)
    setToggleTimer(prev => !prev)
    setBoardKey(prev => prev + 1);
  }

  const handleRetryClick = () => {
    //playSound("button")
    setRetry(true);
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
    setRetryDisable(prev => !prev)
    setToggleTimer(prev => !prev)
    setBoardKey(prev => prev + 1)
  }

  const moveIndicator = (color) => {
    setMoveColor(color)
  }

  const handlePromotion = () => {
    setOpenModal(true)
  }

  if (!loaded) {
    return (
      <PuzzlePageContainer />
    )
  }

  return (
    <div>
      <PuzzlePageContainer>

        {isMobile ? (<>
            <MobilePuzzleWrapper>
              <MobileHeaderContainer>
                  <Header>{title}</Header>
                </MobileHeaderContainer >
                {/* <PromotionalModal openModal={openModal} onPromotionSelection={handlePromotionSelection} /> */}
                  <div className="container" ref={boardRef}>
                  <PuzzleBoard 
                    key={boardKey}
                    fen={fen}
                    retry={retry}
                    correctMoves={correctMoves}
                    unlockNext={unlockNext}
                    count={count}
                    displayOutcome={displayOutcome}
                    promotion={promotion}
                    onPromotion={handlePromotion}
                    moveIndicator={moveIndicator}
                  />
                  </div>
                  <div >
                      <ProgressBar category={"puzzle"} outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count} correct={correct}/>
                  </div>
                  <TimerAndLivesContainer>
                  <Timer toggleTimer={toggleTimer} count={count}/>
                  <Lives lives={lives} isMobile={isMobile} />
                  </TimerAndLivesContainer>
                  <MobileContent>
                  <IndicatorWrapper>
                    {(moveColor === "white") ? (
                      <WhiteIndicator /> ) : (
                      <BlackIndicator />
                     )}
                </IndicatorWrapper>
                  <PuzzleNav category={"puzzle"} disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
                  </MobileContent>
                </MobilePuzzleWrapper>
          </>) : (
          <>
        <PuzzlePageWrapper>
          <PuzzlePageGrid>
            <PuzzleBoardContainer>
              <PuzzleBoardWrapper>
                {/* <PromotionalModal openModal={openModal} onPromotionSelection={handlePromotionSelection} /> */}
                  <div className="container" ref={boardRef}>
                  <PuzzleBoard
                    key={boardKey}
                    fen={fen}
                    retry={retry}
                    correctMoves={correctMoves}
                    unlockNext={unlockNext}
                    count={count}
                    displayOutcome={displayOutcome}
                    promotion={promotion}
                    onPromotion={handlePromotion}
                    moveIndicator={moveIndicator}
                  />
                  </div>
              </PuzzleBoardWrapper>
            </PuzzleBoardContainer>
              <RightPuzzlePanelContainer>
                <HeaderContainer>
                  <Header>{title}</Header>
                </HeaderContainer>
                   <div style={progressContainer}>
                      <ProgressBar category={"puzzle"} outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count} correct={correct}/>
                      <PercentCompleted>{Math.trunc(progress)}%</PercentCompleted>
                  </div>
              <IndicatorWrapper>
            {(moveColor === "white") ? (
                <WhiteIndicator /> ) : (
                  <BlackIndicator />
                )}
                </IndicatorWrapper>
                  <TimerAndLivesContainer>
                    <Timer toggleTimer={toggleTimer} count={count}/>
                    <Lives lives={lives} isMobile={isMobile} />
                  </TimerAndLivesContainer>
              </RightPuzzlePanelContainer>
          </PuzzlePageGrid>
          <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
      </PuzzlePageWrapper>
      </>
        )}
     </PuzzlePageContainer>
    </div>
  );
}


const progressContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: 24,
  paddingBottom: 24,
  width: "80%",
  margin: "auto"
};

export const PercentCompleted = styled.div`
  position: absolute;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
`

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

export const PuzzlePageContainer = styled.div`
    bottom: 0;
    left: 0;
    right: 0;
    top: 0; 
    position: absolute;
    height: 100%;
`
export const PuzzlePageWrapper = styled.div`
    display: flex;
    width: 100%;
    background-image: linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%);
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

export const PuzzlePageGrid = styled.div `
    display: grid;
    grid-template-columns: 2fr 1fr;
    max-width: 1080px;
    grid-gap: 16px;
    padding: 24px 16px;
    justify-content: center;
    grid-template-rows: minmax(300px, auto);
    align-items: center;
  /* @media screen and (max-width: 900px){
    grid-template-columns: minmax(250px, 600px);
    flex-direction: column;
    grid-template-rows: min-content;
    align-items: center;
    padding: 60px 4px 0px 4px; */
  `

export const PuzzleBoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1;
    /* position: relative; */


  @media screen and (max-width: 900px){

  }
`

export const PuzzleBoardWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 24px 0px;
    height: minmax(300px, auto);
`

export const RightPuzzlePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 2;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    height: auto;
    min-width: 300px;
    justify-content: center;
    padding: 60px 0;

    /* @media screen and (max-width: 900px){
    grid-column: 1;
  } */
`

const IndicatorWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const TimerAndLivesContainer = styled.div`
  display: flex;
  width: 100%;
`