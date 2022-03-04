import React, { useState, useEffect, useRef, useReducer} from "react";

import PuzzleBoard from "./PuzzleManager.js";
import ProgressBar from "../Utilities/Progress";

import confirmationSoundFile from "../../../assets/public_sound_standard_Confirmation.mp3";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav";
import styled from "styled-components";
import BlackIndicator from "./TurnIndicator/BlackIndicator";
import WhiteIndicator from "./TurnIndicator/WhiteIndicator";
import Lives from "./Lives/Lives";
import '../../../App.css';

import {getMoves} from '../Utilities/helpers.js';
import {getModuleTitle} from "../Utilities/helpers.js"
import { bonusCalc } from "../Utilities/helpers.js";

import { 
  MobilePuzzleWrapper, 
  MobileHeaderContainer, 
  MobileContent} from "./MobilePuzzle/MobilePuzzleElements";

import { useWindowSize } from "../../../hooks/UseWindowSize";
import Timer from "./Timer/Timer";
import Score from "./ScoreAnimation.js";

// import useDebugInformation from "../../Hooks/useDebugInformation";
// import useRenderCount from "../../Hooks/useRenderCount";


// import Stockfish from "./Stockfish";
// move functions to utils file



const sound = {
  confirmation: new Howl({src: [confirmationSoundFile]}),
  error: new Howl({src: [errorSoundFile]})
}

// create a reducer and refactor PuzzlePage to use it
const puzzlePageReducer = (state, action) => {
  switch (action.type) {

    case "SET_MOVES": {
      let moves = getMoves(action.payload);
      return {
        ...state,
        correctMoves: moves
      };
    }
    
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload
      };

    case "START_TIMER":
      return {
        ...state,
        startTime: action.payload
      };

    case "FAIL": {
      let newLives = state.lives - 1;
      if (newLives < 0) newLives = 0;
      return {
        ...state,
        retryDisable: false,
        continueDisable: false,
        correct: false,
        lives: newLives,
        outcome: false,
        outcomes: [...state.outcomes, false]
      };
    }
    case "SUCCESS": {

      let newTimes = [...state.times, action.payload - state.startTime];
      let bonus = bonusCalc(newTimes);

      return {
        ...state,
        retryDisable: true,
        continueDisable: false,
        correct: true,
        outcome: true,
        outcomes: [...state.outcomes, true],
        times: newTimes,
        currentBonus: bonus,
        bonuses: [...state.bonuses, bonus],
        waiting: true
      };
    } 
    case "RESET":
      return {
        ...state,
        retryDisable: true,
        continueDisable: true,
      };

    case "NEXT": 
      // puzzleData[count+1] should be action.payload
      return {
        ...state,
        count: state.count + 1,
        retry: false,
        waiting: false,
        retryDisable: true,
        toggleTimer: !state.toggleTimer,
        boardKey: state.boardKey + 1,
        fen: action.payload.fen,
        correctMoves: action.payload.moves
      };

    case "RETRY":
      // puzzleData[state.count] should be the action.payload
      return {
        ...state,
        retry: true,
        fen: action.payload.fen,
        boardKey: state.boardKey + 1,
        correctMoves: action.payload.moves,
        retryDisable: true,
        continueDisable: true,
        toggleTimer: !state.toggleTimer,
      };

    default:
      return state;
  }
};




export default function PuzzlePage(props) {
  // useDebugInformation(PuzzlePage, props);
  // const renderCount = useRenderCount();
  const puzzleData = props.puzzles;
  
  const initialState = {
    count: 0,
    correctMoves: [],
    progress: 0,
    startTime: 0,
    lives: 3,
    outcome: false,
    outcomes: [],
    times: [],
    currentBonus: 0,
    waiting: false,
    retry: false,
    retryDisable: true,
    continueDisable: true,
    toggleTimer: false,
    boardKey: 0,
    fen: puzzleData[0].fen,
    bonuses: []
  };

  const [state, dispatch] = useReducer(puzzlePageReducer, initialState);

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
  const [bonuses, setBonuses] = useState([]);
  const [currentBonus, setCurrentBonus] = useState(0);
  const [score, setScore] = useState(0);
  // const [confirmationSound, setConfirmationSound] = useState(null);
  //const [errorSound, setErrorSound] = useState(null);
  const [boardKey, setBoardKey] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const windowDimensions = useWindowSize();
  const isMobile = windowDimensions[0] < 640;

  const title = getModuleTitle(props.theme)
  

  const boardRef = useRef();


  // set instances and cleanup to avoid memory leaks
  useEffect(() => {

    setCorrectMoves(() => getMoves(puzzleData[0].moves));

    dispatch({type: "SET_MOVES", payload: puzzleData[0].moves});

    setLoaded(true);
    return () => {
      if (sound.confirmation.playing()) sound.confirmation.stop();
      if (sound.error.playing()) sound.error.stop();
    }
  } , [])

  

  useEffect(() => {
    // checks if user has missed 3 puzzles - if so route to fialure screen
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

  useEffect(() => {
    if (times.length > 0 && bonuses.length < times.length) { // only calculate if there are times to compare
      // const bonus = bonusCalc(times);

      // setCurrentBonus(bonus);
      let timesCopy = [...times];
      const currentTime = timesCopy.pop()/1000; // puzzle completion time in seconds
      console.log(currentTime)
      const bonus = currentTime < 30 ? 50 : currentTime < 60 ? 25 : currentTime < 120 ? 10 : currentTime < 180 ? 5 : 0;
      console.log({bonus: bonus})
      console.log({bonuses: bonuses})
      setBonuses(prev => [...prev, bonus])
    }
  },[times])

  //if a bonus has been added to the bonuses array, set current bonus to the last element in the array (the most recent bonus)
  useEffect(() => {
    if (bonuses.length > 0)
    setCurrentBonus(bonuses[bonuses.length -1]);
    resetCurrentBonus()
  }, [bonuses])

  //resets current bonus back to 0
  const resetCurrentBonus = () => {
    setTimeout(() => {
      setCurrentBonus(0)
    }, 3000);
  }
  // async function resetCurrentBonus() {
  //   let bonusReset = new Promise(function(resolve) {
  //     setTimeout(function() {resolve(setCurrentBonus(0), 3000)})
  //   })
  //   await bonusReset;

  // }

  // puzzle module is finished
  const finished = () => {
    props.puzzleIsFinished(outcomes, 'succeed', times, bonuses);
  }

  // module failed
  const fail = () => {
    // await wait(1000)
    props.puzzleIsFinished(outcomes, 'fail', times, bonuses);
  }

  // track next puzzle
  const nextPuzzle = () => {
   
    //dispatch({ type: "NEXT", payload: puzzleData[count + 1] });
    
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
  }

  const unlockNext = () => {
    setWaiting(true);
  };

  const playSound = (category) => {
    if (category === "confirmation") {
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
      
      dispatch({ type: "SUCCESS", payload: Date.now() });

      playSound("confirmation");
      setRetryDisable(true)
      setCorrect(true)
    } else {
      
      dispatch({ type: "FAIL" });

      playSound("error");
      setRetryDisable(false)
      setCorrect(false)
      setLives(prev => prev - 1)
    }
    setPromotion("x")
    setOutcome(success);
    setOutcomes(prevOutcomes => [...prevOutcomes, success]);
  };

  console.log(state)
  useEffect(() => {
    let now = Date.now();
    if (toggleTimer) {
      dispatch({ type: "START_TIMER", payload: now });
      setStartTime(now);
    } else {
      setTimes(prevTimes => [...prevTimes, now - startTime])
    }
  },[toggleTimer])


  const incrementCount = () => {
    setCount((count) => count + 1);
  };
  
  const returnPercent = (percent) => {
    dispatch({ type: "SET_PROGRESS", payload: percent });
    setProgress(percent)
    if (percent >= 100) {
      finished()
    }
  }

  function handleContinueClick() {
    //playSound("button")
    dispatch({ type: "NEXT", payload: puzzleData[count + 1] });

    incrementCount()
    setRetry(false)
    setWaiting(false)
    setRetryDisable(true)
    setToggleTimer(prev => !prev)
    setBoardKey(prev => prev + 1);
  }

  const handleRetryClick = () => {

    dispatch({ type: "RETRY", payload: puzzleData[count] });

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
    <>
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
                    
                  <Score currentBonus={currentBonus}>
                    {currentBonus}
                  </Score> 
                
                  <IndicatorWrapper>
                    {(moveColor === "white") ? (
                      <WhiteIndicator /> ) : (
                      <BlackIndicator />
                     )}
                </IndicatorWrapper>
                  </MobileContent>
                  <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
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
                  
                  <Score currentBonus={currentBonus}>
                    {currentBonus}
                  </Score> 
                  
              </RightPuzzlePanelContainer>
          </PuzzlePageGrid>
          <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
      </PuzzlePageWrapper>
      </>
        )}
     </PuzzlePageContainer>
    </>
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
    background-image: linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%);
`
export const PuzzlePageWrapper = styled.div`
    display: flex;
    width: 100%;
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
    padding: 80px 16px 0px 16px;
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
    padding-top: 60px;

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


