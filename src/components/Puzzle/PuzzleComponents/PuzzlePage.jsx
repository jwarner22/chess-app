import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";

// import Swal from "sweetalert2";
import {getMoves, wait} from '../Utilities/helpers.js';
import confirmationSoundFile from "../../../assets/public_sound_standard_Confirmation.mp3";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav"
import styled from "styled-components"
import {Modules} from "../../PostLogin/Views/PatternRecognition/CourseTiles/Data"
import { StoreMallDirectory } from "@styled-icons/material";
import PromotionalModal from "../../PostLogin/PromotionModal/PromotionalModal"

import BlackIndicator from "./TurnIndicator/BlackIndicator"
import WhiteIndicator from "./TurnIndicator/WhiteIndicator"
import { Construction } from "@styled-icons/material-twotone";
// import Stockfish from "./Stockfish";
// move functions to utils file

/*
function NextButton(props) {
  const handleClick = props.onClick;

  return(
    <div className={"next-button-container"}>
      <button
        id="next-button"
        className={"next-button"}
        onClick={handleClick}
      >
        {" "}
        {"Next Puzzle"}{" "}
      </button>
    </div>
  )
}
*/
const getModuleTitle = (name) => {
  const module = Modules.find(module => module.type_ref === name)
  return module.headline
}


export default function PuzzlePage(props) {
  const [moveColor, setMoveColor] = useState("")
  const puzzleData = props.puzzles;
  const [count, setCount] = useState(0);
  const [fen, setFen] = useState(puzzleData[0].fen);
  const [progress, setProgress] = useState(count);
  const [outcome, setOutcome] = useState(null)
  const [outcomes,setOutcomes] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [retry, setRetry] = useState(false);
  const [retryDisable, setRetryDisable] = useState(true);
  const [correctMoves, setCorrectMoves] = useState(
    getMoves(puzzleData[0].moves)
  );
  const [openModal, setOpenModal] = useState(false);
  const [promotion, setPromotion] = useState("x");
  const confirmationSound = new Howl({src: confirmationSoundFile})
  const errorSound = new Howl({src: errorSoundFile})
  const title = getModuleTitle(props.theme)

  useEffect(() => {
    // checks if user has missed 4 puzzles - if so route to fialure screen
    if (outcomes.filter(entry => entry === false).length > 3) {
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

  // puzzle module is finished
  const finished = async () => {
    props.puzzleIsFinished(outcomes, 'succeed');
  }

  // module failed
  const fail = async () => {
    await wait(1000)
    props.puzzleIsFinished(outcomes, 'fail')
  }

  // track next puzzle
  const nextPuzzle = () => {
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
  }

  const unlockNext = () => {
    // legacy - used to unlock button. Saving for now 
    setWaiting(true);
  };

  const displayOutcome = (success) => {
    // play sound to indicate success or failure
    if (success) {
      confirmationSound.play()
      setRetryDisable(true)
    } else {
      errorSound.play()
      setRetryDisable(false)
      
    }
    setPromotion("x")
    setOutcome(success);
    setOutcomes(prevOutcomes => [...prevOutcomes, success]);
    //incrementCount();
  };

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
    incrementCount()
    setRetry(false)
    setWaiting(false)
    setRetryDisable(true)
  }

  const handleRetryClick = () => {
    setRetry(true)
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
    setRetryDisable(true)
  }

  const handlePromotion = () => {
    setOpenModal(true)
  }

  const handlePromotionSelection = (e) => {
    console.log({promotion: e});
    console.log("test")
    setPromotion(e)
    setOpenModal(false)
  }

  const moveIndicator = (color) => {
    console.log(color)
    setMoveColor(color)
  }

  return (
    <div>
      <PuzzlePageContainer>
        <HeaderContainer>
        <Header>{title}</Header>
        </HeaderContainer>
      <div style={progressContainer}>
        <ProgressBar outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count}/>
      </div>
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
      <IndicatorWrapper>
      {(moveColor === "white") ? (
          <WhiteIndicator /> ) : (
            <BlackIndicator />
          )}
          </IndicatorWrapper>
      <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
     </PuzzlePageContainer>
    </div>
  );
}

const progressContainer = {
  margin: "0 auto",
  width: "40%",
  minWidth: "320px"

};

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
  grid-gap: 16px;
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

const IndicatorWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`