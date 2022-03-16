import React, { useState, useEffect, useRef, useReducer, useContext} from "react";

import PuzzleBoard from "./PuzzleManager.js";
import ProgressBar from "../Utilities/Progress";

import confirmationSoundFile from "../../../assets/public_sound_standard_Confirmation.mp3";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav";
import BlackIndicator from "./TurnIndicator/BlackIndicator";
import WhiteIndicator from "./TurnIndicator/WhiteIndicator";
import Lives from "./Lives/Lives";
import '../../../App.css';

import {getModuleTitle} from "../Utilities/helpers.js"

import { 
  MobilePuzzleWrapper, 
  MobileHeaderContainer, 
  MobileContent} from "./MobilePuzzle/MobilePuzzleElements";

import { useWindowSize } from "../../../hooks/UseWindowSize";
import Timer from "./Timer/Timer";
import Score from "./ScoreAnimation.js";

import {baseURL} from "../../../api/apiConfig";
import useFetch from '../../../api/useFetch';
import { puzzlePageReducer } from "./puzzlePageReducer";
import { PuzzlePageContainer, Header, TimerAndLivesContainer, IndicatorWrapper, PuzzlePageWrapper, PuzzlePageGrid, PuzzleBoardContainer, PuzzleBoardWrapper, RightPuzzlePanelContainer, HeaderContainer, progressContainer, PercentCompleted } from "./PuzzlePageElements";
import { UserContext } from "../../../providers/GlobalState.js";
import { ScoreContainer } from "./ScoreAnimation.js";
// import useDebugInformation from "../../Hooks/useDebugInformation";
// import useRenderCount from "../../Hooks/useRenderCount";


// import Stockfish from "./Stockfish";
// move functions to utils file

const calcSingleElo = (outcome, puzzleData, playerRating, np) => {

    let k = Math.max(800/np,40); // calibration factor. 40 because first time completing module
    let maxDiff = 400; // max rating diff
    let puzzleRating = parseInt(puzzleData.rating);
    // calculates rating difference capped at 400
      //const ratingDifference = (puzzleRating, playerRating) => Math.max((puzzleRating-playerRating),-maxDiff); 
      
      // expected outcome, formula: E = 1/1 + 10^((PR-PlayerRating)/400)
      //const expected = (playerRating, puzzleRating) => 1/(1+Math.pow(10, (ratingDifference(puzzleRating,playerRating))/maxDiff));

    const Qa = Math.pow(10, playerRating/400);     //calculate QA of elo
    const Qb = Math.pow(10, (puzzleRating/400)); //calculate QB of puzzle rating
    const Ea = Qa/(Qa+Qb);  //calculate expected outcome
    const Sa = outcome ? 1 : 0; //calculate actual outcome
    let ratingDiff = k*(Sa - Ea); //calculate ratingDiff

    if  (Math.abs(ratingDiff) > maxDiff) ratingDiff = ratingDiff > 0 ? maxDiff : -maxDiff; //cap rating diff
    
    const newRating = parseInt(playerRating + ratingDiff); //calculate new rating


      // let playerExpected = expected(elo, data.rating);
      // let actual = outcome ? 1 : -1;
      // let ratingChange = parseInt(k * (actual - playerExpected), 10);
      // console.log(actual, ratingChange, playerExpected, elo, data.rating)
      // let newRating = elo + ratingChange; // apply changes
      console.log({newRating: newRating, outcome: outcome, puzzleData: puzzleData, playerRating: playerRating, ratingDiff: ratingDiff})
      return newRating
}

const sound = {
  confirmation: new Howl({src: [confirmationSoundFile]}),
  error: new Howl({src: [errorSoundFile]})
}

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
  const [puzzle, setPuzzle] = useState();
  const [elo, setElo] = useState(props.themeData.rating);
  const [eloDev, setEloDev] = useState(0);
  const [idHistory, setIdHistory] = useState([]);
  // const [count, setCount] = useState(0);}
  // const [fen, setFen] = useState(puzzleData[0].fen);
  // const [progress, setProgress] = useState(0);
  // const [outcome, setOutcome] = useState(null)
  // const [outcomes,setOutcomes] = useState([]);
  // const [waiting, setWaiting] = useState(false);
  // const [retry, setRetry] = useState(false);
  // const [retryDisable, setRetryDisable] = useState(true);
  // const [correctMoves, setCorrectMoves] = useState(null);
  // const [correct, setCorrect] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  // const [promotion, setPromotion] = useState("x");
  // const [startTime, setStartTime] = useState(null);
  // const [times, setTimes] = useState([]);
  // const [toggleTimer, setToggleTimer] = useState(true);
  // const [lives, setLives] = useState(3);
  // const [bonuses, setBonuses] = useState([]);
  // const [currentBonus, setCurrentBonus] = useState(0);
  // const [score, setScore] = useState(0);
  // const [confirmationSound, setConfirmationSound] = useState(null);
  //const [errorSound, setErrorSound] = useState(null);
  // const [boardKey, setBoardKey] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const {themesData, updateThemesData} = useContext(UserContext);


  const windowDimensions = useWindowSize();
  const isMobile = windowDimensions[0] < 640;

  const title = getModuleTitle(props.theme)
  
    // fetch Hook
    const {get} = useFetch(baseURL);

  const boardRef = useRef();


  // set instances and cleanup to avoid memory leaks
  useEffect(() => {
    // if first time doing modile, get single puzzle
    //if (props.initial) getSinglePuzzle(800);
    //setCorrectMoves(() => getMoves(puzzleData[0].moves));
    initializePuzzle();
    // dispatch({type: "SET_MOVES", payload: puzzleData[0].moves});
    // setPuzzle(puzzleData[0]);
    // setLoaded(true);
    return () => {
      if (sound.confirmation.playing()) sound.confirmation.stop();
      if (sound.error.playing()) sound.error.stop();
    }
  } , [])

  
  useEffect(() => {
    // checks if user has missed 3 puzzles - if so route to fialure screen
    let failureTimeout = null;
    if (state.lives === 0) {  // if lives = 0, then user has failed
      failureTimeout = setTimeout(fail, 1500); // wait 1.5 seconds before going to failure screen
    }
    return () => clearTimeout(failureTimeout); // clear timout on unmount
  }, [state.lives]);

  useEffect(() => {
    let now = Date.now();
    if (state.toggleTimer) {
      dispatch({ type: "START_TIMER", payload: now });
      //setStartTime(now);
    }
    //  else {
    //   //setTimes(prevTimes => [...prevTimes, now - startTime])
    // }
  },[state.toggleTimer])

  const initializePuzzle = async () => {

    let initialPuzzle = await getSinglePuzzle();
    console.log(initialPuzzle)
    setPuzzle(initialPuzzle);
    dispatch({type: "INITIALIZE", payload: initialPuzzle});
    // dispatch({type: "SET_MOVES", payload: initialPuzzle.moves});
    // dispatch({type: "SET_FEN", payload: initialPuzzle.fen});
    setLoaded(true);
    return;
  }

  // useEffect(() => {
  //   if (progress < 100) {
  //     //nextPuzzle();
  //   }
  // }, [count])

  // useEffect(() => {
  //   if (progress >= 100) {
  //     setTimeout(finished(), 2000);
  //   }
  // }, [progress])

  // useEffect(() => {
  //   if (lives < 0){
  //     setLives(0)
  //   }
  // },[lives])

  // useEffect(() => {
  //   if (times.length > 0 && bonuses.length < times.length) { // only calculate if there are times to compare

  //     let timesCopy = [...times];
  //     const currentTime = timesCopy.pop()/1000; // puzzle completion time in seconds
  //     const bonus = currentTime < 5 ? 100 : currentTime < 10 ? 75 : currentTime < 20 ? 50 : currentTime < 30 ? 25 : currentTime < 45 ? 10 : 0;
  //     setBonuses(prev => [...prev, bonus])
  //   }
  // },[times])

  //if a bonus has been added to the bonuses array, set current bonus to the last element in the array (the most recent bonus)
  // useEffect(() => {
  //  // if (state.bonuses.length > 0) resetCurrentBonus()
  //   //setCurrentBonus(bonuses[bonuses.length -1]);
  // }, [state.bonuses.length])


  const getSinglePuzzle = async () => {
    let delta = parseInt(eloDev)
    let fetchElo = parseInt(elo + delta); // add 20% to elo to allow for progression
    console.log({elo: elo, fetchElo: fetchElo, delta: delta})
    const puzzles = await get(`/puzzle/${props.theme}/${fetchElo}`)
    //dispatch({type: "SET_FEN", payload: puzzle[0].fen});
    //dispatch({type: "SET_MOVES", payload: puzzle[0].moves});
    console.log({singlePuzzle: puzzles});
    let puzzle = puzzles.find(p => !idHistory.some(id => id === p.puzzle_id)) // check if puzzle has already been played
    if (puzzle == null) return puzzles[0]; // if all puzzles have been played, return first puzzle (backup plan)
    setIdHistory(prev => [...prev, puzzle.puzzle_id]) // add puzzle id to history
    return puzzle;
  }

  const calcRatingDev = (outcome) => {

    let np = (props.themeData.completed*5 + state.count)*0.5;
    np = np > 10 ? 10 : np; // cap np at 10
    np = np === 0 ? 1 : np; // if np is 0, set to 1 (prevent divide by zero)
    let delta = 0; //200/np;
    if (!outcome) return delta/2 
    return delta
  }
  //resets current bonus back to 0
  // const resetCurrentBonus = () => {
  //   setTimeout(() => {
  //     //setCurrentBonus(0)
  //     console.log('reset bonus')
  //     dispatch('RESET_BONUS') 
  //   }, 3000);
  // }
  // async function resetCurrentBonus() {
  //   let bonusReset = new Promise(function(resolve) {
  //     setTimeout(function() {resolve(setCurrentBonus(0), 3000)})
  //   })
  //   await bonusReset;

  // }

  // puzzle module is finished
  const finished = () => {
    props.moduleIsFinished(state.outcomes, 'succeed', state.times, state.bonuses, state.ratings, elo);
  }

  // module failed
  const fail = () => {
    // await wait(1000)
    props.moduleIsFinished(state.outcomes, 'fail', state.times, state.bonuses, state.ratings, elo);
  }

  // track next puzzle
  // const nextPuzzle = () => {
   
  //   //dispatch({ type: "NEXT", payload: puzzleData[count + 1] });
    
  //   setFen(() => puzzleData[count].fen);
  //   setCorrectMoves(() => getMoves(puzzleData[count].moves));
  // }

  // const unlockNext = () => {
  //   //setWaiting(true);
  // };

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
    //setToggleTimer(prev => !prev)
    // play sound to indicate success or failure
    if (success) {
      dispatch({ type: "SUCCESS", payload: Date.now() });
      playSound("confirmation");
      // setRetryDisable(true)
      // setCorrect(true)
    } else {
      dispatch({ type: "FAIL" });
      playSound("error");
      // setRetryDisable(false)
      // setCorrect(false)
      // setLives(prev => prev - 1)
    }
    //if (props.initial) {
      // if (success) {
      //   setElo(prev => parseInt(prev + eloDev)); // add elo deviation to user elo
      // } else {
      //   setElo(prev => parseInt(prev - (eloDev*0.5))); // subtract half of elo deviation from user elo
      //   setEloDev(prev => parseInt(prev * 0.5)); // halve elo deviation
      // }
    let np = props.themeData.completed*5 + state.count;
    let newElo = calcSingleElo(success, puzzle, elo, np);
    setElo(newElo);
    let newRatingDev = calcRatingDev(success)
    setEloDev(newRatingDev)
      //let newElo = calcSingleElo(success, puzzle, elo)
      //setElo(newElo);

    //}
    //setPromotion("x")
    // setOutcome(success);
    // setOutcomes(prevOutcomes => [...prevOutcomes, success]);
  };


  // const incrementCount = () => {
  //   setCount((count) => count + 1);
  // };
  
  const returnPercent = (percent) => {
    dispatch({ type: "SET_PROGRESS", payload: percent });
    //setProgress(percent)
    if (percent >= 100) {
      setTimeout(finished(), 1000);
    }
  }

  async function handleContinueClick() {
    //playSound("button")
    // newPuzzleData = puzzleData[state.count + 1];
    //if (props.initial) {
    let newPuzzleData = await getSinglePuzzle(elo);
    console.log({puzzle: newPuzzleData})
      //console.log(newPuzzleData_single)
    //}
    setPuzzle(newPuzzleData)
    //dispatch({ type: "NEXT", payload: puzzleData[state.count + 1] });
    dispatch({ type: "NEXT", payload: newPuzzleData});

    //incrementCount()
    // setRetry(false)
    // setWaiting(false)
    // setRetryDisable(true)
    // setToggleTimer(prev => !prev)
    // setBoardKey(prev => prev + 1);
  }

  const handleRetryClick = () => {

    dispatch({ type: "RETRY", payload: puzzle });

    //playSound("button")
    // setRetry(true);
    // setFen(() => puzzleData[count].fen);
    // setCorrectMoves(() => getMoves(puzzleData[count].moves));
    // setRetryDisable(prev => !prev)
    // setToggleTimer(prev => !prev)
    // setBoardKey(prev => prev + 1)
  }

  const moveIndicator = (color) => {
    setMoveColor(color)
  }

  // const handlePromotion = () => {
  //   setOpenModal(true)
  // }

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
                    state={state}
                    key={state.boardKey}
                    displayOutcome={displayOutcome}
                    moveIndicator={moveIndicator}
                  />
                  </div>
                  <div >
                      <ProgressBar category={"puzzle"} outcomes={state.outcomes.length} outcome={state.outcome} returnPercent={returnPercent} count={state.count} correct={state.correct}/>
                  </div>
                  <TimerAndLivesContainer>
                  <Timer toggleTimer={state.toggleTimer} count={state.count}/>
                  <Lives lives={state.lives} isMobile={isMobile} />
                  </TimerAndLivesContainer>
                  <MobileContent>
                    
                 {state.correct && <Score currentBonus={state.currentBonus}>
                    {state.currentBonus}
                  </Score>}
                
                  <IndicatorWrapper>
                    {(moveColor === "white") ? (
                      <WhiteIndicator /> ) : (
                      <BlackIndicator />
                     )}
                </IndicatorWrapper>
                  </MobileContent>
                  <PuzzleNav disabled={!state.waiting} retryDisable={state.retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
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
                    state={state}
                    key={state.boardKey}
                    displayOutcome={displayOutcome}
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
                      <ProgressBar category={"puzzle"} outcomes={state.outcomes.length} outcome={state.outcome} returnPercent={returnPercent} count={state.count} correct={state.correct} retry={state.retry} />
                      <PercentCompleted>{Math.trunc(state.progress)}%</PercentCompleted>
                  </div>
              <IndicatorWrapper>
            {(moveColor === "white") ? (
                <WhiteIndicator /> ) : (
                  <BlackIndicator />
                )}
                </IndicatorWrapper>
                  <TimerAndLivesContainer>
                    <Timer toggleTimer={state.toggleTimer} count={state.count}/>
                    <Lives lives={state.lives} isMobile={isMobile} />
                  </TimerAndLivesContainer>
                  <ScoreContainer>
                    Time Bonus:
                  {state.correct && <Score currentBonus={state.currentBonus}>
                    {state.currentBonus}
                  </Score>}
                  </ScoreContainer>
              </RightPuzzlePanelContainer>
          </PuzzlePageGrid>
          <PuzzleNav disabled={!state.waiting} retryDisable={state.retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
      </PuzzlePageWrapper>
      </>
        )}
     </PuzzlePageContainer>
    </>
  );
}



