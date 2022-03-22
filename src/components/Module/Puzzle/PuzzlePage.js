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

    let k = Math.max(600/np,40); // calibration factor.
    let maxDiff = 400; // max rating diff
    let puzzleRating = parseInt(puzzleData.rating);
    
    const Qa = Math.pow(10, playerRating/400);     //calculate QA of elo
    const Qb = Math.pow(10, (puzzleRating/400)); //calculate QB of puzzle rating
    const Ea = Qa/(Qa+Qb);  //calculate expected outcome
    const Sa = outcome ? 1 : 0; //calculate actual outcome
    let ratingDiff = k*(Sa - Ea); //calculate ratingDiff

    if  (Math.abs(ratingDiff) > maxDiff) ratingDiff = ratingDiff > 0 ? maxDiff : -maxDiff; //cap rating diff
    
    const newRating = parseInt(playerRating + ratingDiff); //calculate new rating

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
  const [loaded, setLoaded] = useState(false);

  const {get} = useFetch(baseURL);   // fetch Hook
  const boardRef = useRef();

  const windowDimensions = useWindowSize();
  const isMobile = windowDimensions[0] < 640;

  const title = getModuleTitle(props.theme);

  // set instances and cleanup to avoid memory leaks
  useEffect(() => {
    initializePuzzle();
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
    }
  },[state.toggleTimer])


  const initializePuzzle = async () => {

    let initialPuzzle = await getSinglePuzzle();
    setPuzzle(initialPuzzle);
    dispatch({type: "INITIALIZE", payload: initialPuzzle});
    setLoaded(true);
    return;
  }


  const getSinglePuzzle = async () => {
    const delta = parseInt(eloDev)
    const fetchElo = parseInt(elo + delta); // add 20% to elo to allow for progression
    console.log({elo: elo, fetchElo: fetchElo, delta: delta})

    const puzzles = await get(`/puzzle/${props.theme}/${fetchElo}`)
    console.log({singlePuzzle: puzzles});

    let puzzle = puzzles.find(p => !idHistory.some(id => id === p.puzzle_id)) // check if puzzle has already been played
    if (puzzle == null) return puzzles[0]; // if all puzzles have been played, return first puzzle (backup plan)
    setIdHistory(prev => [...prev, puzzle.puzzle_id]) // add puzzle id to history

    return puzzle;
  }

  // amount to offset rating by
  const calcRatingDev = (outcome) => {
    //let np = (props.themeData.completed*5 + state.count)*0.5;
    //np = np > 10 ? 10 : np; // cap np at 10
   // np = np === 0 ? 1 : np; // if np is 0, set to 1 (prevent divide by zero)
    let delta = 0; //200/np;
    if (!outcome) return delta/2 
    return delta
  }

  // puzzle module is finished
  const finished = () => {
    props.moduleIsFinished(state.outcomes, 'succeed', state.times, state.bonuses, state.ratings, elo);
  }

  // module failed
  const fail = () => {
    props.moduleIsFinished(state.outcomes, 'fail', state.times, state.bonuses, state.ratings, elo);
  }


  const playSound = (category) => {
    if (category === "confirmation") {
      sound.confirmation.play();
    } else if (category === "error") {
      sound.error.play();
    }
    return null;
  }

  
  const displayOutcome = (success) => {
    // play sound to indicate success or failure
    if (success) {
      dispatch({ type: "SUCCESS", payload: Date.now() });
      playSound("confirmation");
    } else {
      dispatch({ type: "FAIL" });
      playSound("error");
    }

    let np = props.themeData.completed*5 + state.count;

    let newElo = calcSingleElo(success, puzzle, elo, np);
    setElo(newElo);

    let newRatingDev = calcRatingDev(success)
    setEloDev(newRatingDev)

  };

  
  const returnPercent = (percent) => {
    dispatch({ type: "SET_PROGRESS", payload: percent });
    if (percent >= 100) {
      setTimeout(finished(), 1000);
    }
  }

  async function handleContinueClick() {

    let newPuzzleData = await getSinglePuzzle(elo);
    console.log({puzzle: newPuzzleData})

    setPuzzle(newPuzzleData)
    dispatch({ type: "NEXT", payload: newPuzzleData});

  }

  const handleRetryClick = () => {
    dispatch({ type: "RETRY", payload: puzzle });
  }

  const moveIndicator = (color) => {
    setMoveColor(color)
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



