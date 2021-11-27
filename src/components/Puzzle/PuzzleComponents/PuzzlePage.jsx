import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom';
import PuzzleBoard from "./PuzzleBoard";
import ProgressBar from "../Utilities/Progress";

// import Swal from "sweetalert2";
import {getMoves, wait} from '../Utilities/helpers.js';
import confirmationSoundFile from "../../../assets/mixkit-quick-win-video-game-notification-269.wav";
import errorSoundFile from "../../../assets/public_sound_standard_Error.mp3";
//import selectSoundFile from "../../../assets/mixkit-select-click-1109.wav";
import {Howl} from 'howler';
import PuzzleNav from "./PuzzleNav"
import styled from "styled-components"
import {Modules} from "../../PostLogin/Views/PatternRecognition/CourseTiles/Data"
import { StoreMallDirectory } from "@styled-icons/material";
import PromotionalModal from "../../PostLogin/PromotionModal/PromotionalModal"
import BackButton from "../../BackButton"
import BlackIndicator from "./TurnIndicator/BlackIndicator"
import WhiteIndicator from "./TurnIndicator/WhiteIndicator"
import { Construction } from "@styled-icons/material-twotone";
import {BackButtonWrapper} from "../Utilities/Progress"
import Lives from "./Lives/Lives"

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
  // const [lives, setLives] = useState(3)
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
  const [correct, setCorrect] = useState(null);
  const confirmationSound = new Howl({src: confirmationSoundFile})
  const errorSound = new Howl({src: errorSoundFile})
  //const selectSound = new Howl({src: selectSoundFile})
  const title = getModuleTitle(props.theme)
  const [lives, setLives] = useState(3);


  // console.log(livesLost)

  useEffect(() => {
    // checks if user has missed 4 puzzles - if so route to fialure screen
    if (outcomes.filter(entry => entry === false).length > 3) {
      fail()
    }
  }, [outcomes]);

  useEffect(() => {
    
  },[])

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
      setCorrect(true)
      setRetryDisable(true)
    } else {
      errorSound.play()
      setCorrect(false)
      setRetryDisable(false)
      setLives(prev => prev - 1)
      
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
    //selectSound.play()
  }

  const handleRetryClick = () => {
    setRetry(true)
    setFen(() => puzzleData[count].fen);
    setCorrectMoves(() => getMoves(puzzleData[count].moves));
    setRetryDisable(prev => !prev)
    //selectSound.play();
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
          <BackButtonWrapper>
            <BackButton />
          </BackButtonWrapper>
        <HeaderContainer>
        <Header>{title}</Header>
        </HeaderContainer>
      <div style={progressContainer}>
        <ProgressBar outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count} retry={retry}/>
        {/* <div percentComplete={percentComplete}>{percentComplete}</div> */}
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
        <LivesWrapper>
        Lives Remaining = {lives}  
        </LivesWrapper>
        <IndicatorWrapper>
          <NumericIndicator correct={correct} />
        </IndicatorWrapper>
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

const NumericIndicator = (props) => {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    setVisible(true)
    toggleVisible();
  },[props.correct])

  const toggleVisible = async () => {
    await wait(2000)
    setVisible(prev => !prev)
  }
if (visible) {
  if (props.correct) {
    return(
      <div style={{color: '#30F218'}}> +20 </div>
    )
  } else if (props.correct == null) {
    return(
      <div></div>
    )
  } else {
    return <div style={{color: '#F24F3D'}}>-10</div>
  }
} else {
  return <div></div>
}
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

const LivesWrapper = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
 color: #247cf1;
`

const LivesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  
`
const LivesImg = styled.img`
  max-width: 30px;
`