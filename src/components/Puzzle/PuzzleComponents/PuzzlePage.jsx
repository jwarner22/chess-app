import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";

// import Swal from "sweetalert2";
import {getMoves, wait} from '../Utilities/helpers.js';
import confirmationSoundFile from "../../../assets/public_sound_standard_Confirmation.mp3";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
import buttonSoundFile from "../../../assets/click_005.ogg";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav"
import styled from "styled-components"
import {Modules} from "../../PostLogin/Views/PatternRecognition/CourseTiles/Data"
import PromotionalModal from "../../PostLogin/PromotionModal/PromotionalModal"
import BackButton from "../../BackButton"
import BlackIndicator from "./TurnIndicator/BlackIndicator"
import WhiteIndicator from "./TurnIndicator/WhiteIndicator"
import {BackButtonWrapper} from "../Utilities/Progress"
import Lives from "./Lives/Lives"

import { 
  MobilePuzzleWrapper, 
  MobileHeaderContainer, 
  MobileContent} from "./MobilePuzzle/MobilePuzzleElements";

import { useWindowSize } from "../../Hooks/UseWindowSize";
import Timer from "./Timer/Timer";

// import Stockfish from "./Stockfish";
// move functions to utils file


const getModuleTitle = (name) => {
  const module = Modules.find(module => module.type_ref === name)
  return module.headline
}

export default function PuzzlePage(props) {

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
  const [correctMoves, setCorrectMoves] = useState(
    getMoves(puzzleData[0].moves)
  );
  const [correct, setCorrect] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [promotion, setPromotion] = useState("x");
  const [startTime, setStartTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [toggleTimer, setToggleTimer] = useState(true)
  const [lives, setLives] = useState(3)

  
  const confirmationSound = new Howl({src: confirmationSoundFile})
  const errorSound = new Howl({src: errorSoundFile})
  const buttonSound = new Howl({src: buttonSoundFile})

  const windowDimensions = useWindowSize();
  const isMobile = windowDimensions[0] < 640;

  const title = getModuleTitle(props.theme)


  useEffect(() => {
    // checks if user has missed 4 puzzles - if so route to fialure screen
    if (outcomes.filter(entry => entry === false).length > 2) {
      fail()
    }
  }, [outcomes]);

  useEffect(() => {
    if (progress < 100) {
      nextPuzzle();
    }
  }, [count])

  useEffect(() => {
    if (progress >= 100) {
      finished()
    }
  }, [progress])

  useEffect(() => {
    if (lives < 0){
      setLives(0)
    }
  },[lives])

  // puzzle module is finished
  const finished = async () => {
    props.puzzleIsFinished(outcomes, 'succeed', times);
  }

  // module failed
  const fail = async () => {
    await wait(1000)
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

  const playSound = (sound) => {
    if (sound === "confirmation") {
      return confirmationSound.play();
    } else if (sound === "error") {
      return errorSound.play();
    } else  if (sound === "button") {
      //return buttonSound.play();
    }
  }

  const displayOutcome = async (success) => {
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

  async function handleContinueClick() {
    //playSound("button")
    incrementCount()
    setRetry(false)
    setWaiting(false)
    setRetryDisable(true)
    setToggleTimer(prev => !prev)
  }

  const handleRetryClick = async () => {
    //playSound("button")
    setRetry(true)
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
    setRetryDisable(prev => !prev)
    setToggleTimer(prev => !prev)
  }

  const handlePromotion = () => {
    setOpenModal(true)
  }

  const handlePromotionSelection = (e) => {
    setPromotion(e)
    setOpenModal(false)
  }

  const moveIndicator = (color) => {
    setMoveColor(color)
  }


  return (
    <div>
      <PuzzlePageContainer>
        {isMobile ? (<>
            <MobilePuzzleWrapper>
              <MobileHeaderContainer>
                  <Header>{title}</Header>
                </MobileHeaderContainer>
                <PromotionalModal openModal={openModal} onPromotionSelection={handlePromotionSelection} />
                  <PuzzleBoard
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
                  <div >
                      <ProgressBar outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count} correct={correct}/>
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
                  <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
                  </MobileContent>
                </MobilePuzzleWrapper>
          </>) : (
          <>
        <PuzzlePageWrapper>
          <PuzzlePageGrid>
            <PuzzleBoardContainer>
              <PuzzleBoardWrapper>
                <PromotionalModal openModal={openModal} onPromotionSelection={handlePromotionSelection} />
                  <PuzzleBoard
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
              </PuzzleBoardWrapper>
            </PuzzleBoardContainer>
              <RightPuzzlePanelContainer>
                <HeaderContainer>
                  <Header>{title}</Header>
                </HeaderContainer>
                   <div style={progressContainer}>
                      <ProgressBar outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count} correct={correct}/>
                      <PercentCompleted>{Math.trunc(progress)}/100</PercentCompleted>
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
                <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
              </RightPuzzlePanelContainer>
          </PuzzlePageGrid>
      </PuzzlePageWrapper>
      </>
        )}
     </PuzzlePageContainer>
    </div>
  );
}

// does it fuking work now
// No, it doesn't fucking work. You dumb, stupid, weak, pathetic, white, white... uh, uh... guilt, white guilt, milquetoast piece of human garbage.

const progressContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: 24,
  paddingBottom: 24
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
`

export const PuzzlePageGrid = styled.div `
    display: grid;
    grid-template-columns: minmax(300px, auto) min-content;
    max-width: 100%;
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
  }
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