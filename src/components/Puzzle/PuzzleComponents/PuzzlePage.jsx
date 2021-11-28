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
import BackButton from "../../BackButton"
import BlackIndicator from "./TurnIndicator/BlackIndicator"
import WhiteIndicator from "./TurnIndicator/WhiteIndicator"
import { Construction } from "@styled-icons/material-twotone";
import {BackButtonWrapper} from "../Utilities/Progress"
import Lives from "./Lives/Lives"
import MobilePuzzle from "./MobilePuzzle/MobilePuzzle";
import { MobilePuzzleContainer, 
  MobilePuzzleWrapper, 
  MobileHeaderContainer, 
  MobileContent} from "./MobilePuzzle/MobilePuzzleElements";

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
  const [correct, setCorrect] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [promotion, setPromotion] = useState("x");
  const [windowDimension, setWindowDimension] = useState(null);
  const confirmationSound = new Howl({src: confirmationSoundFile})
  const errorSound = new Howl({src: errorSoundFile})
  const title = getModuleTitle(props.theme)
  const livesLost = outcomes.filter(entry => entry === false).length;
  const startingLives = 3
  const {...rest} = props

  // console.log(livesLost)

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
      setRetryDisable(true)
      setCorrect(true)
    } else {
      errorSound.play()
      setRetryDisable(false)
      setCorrect(false)
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
    setRetryDisable(prev => !prev)
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

  const livesRemaining = () => {
    return startingLives - livesLost
  }
  const totalLives = livesRemaining()
  // const percentComplete = returnPercent()

  return (
    <div>
      <PuzzlePageContainer>
        {isMobile ? (<>
          {/* <MobilePuzzleContainer> */}
            <MobilePuzzleWrapper>
              <BackButtonWrapper>
                <BackButton />
              </BackButtonWrapper>
              <MobileHeaderContainer>
                  <Header>{title}</Header>
                </MobileHeaderContainer>
                <div style={progressContainer}>
                      <ProgressBar outcomes={outcomes.length} outcome={outcome} returnPercent={returnPercent} count={count} correct={correct}/>
                      {/* <div percentComplete={percentComplete}>{percentComplete}</div> */}
                  </div>
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
                  <MobileContent>
                  <IndicatorWrapper>
                    {(moveColor === "white") ? (
                      <WhiteIndicator /> ) : (
                      <BlackIndicator />
                     )}
                </IndicatorWrapper>
                <LivesWrapper>
                  <strong>{totalLives}</strong>&nbsp;Lives Remaining 
              </LivesWrapper>
                  <PuzzleNav disabled={!waiting} retryDisable={retryDisable} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} isDaily={props.isDaily} />
                  </MobileContent>
                </MobilePuzzleWrapper>
              {/* </MobilePuzzleContainer> */}
          </>) : (
          <>
      <BackButtonWrapper>
                <BackButton />
              </BackButtonWrapper>
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
                      {/* <div percentComplete={percentComplete}>{percentComplete}</div> */}
                  </div>
              <IndicatorWrapper>
            {(moveColor === "white") ? (
                <WhiteIndicator /> ) : (
                  <BlackIndicator />
                )}
                </IndicatorWrapper>
                <LivesWrapper>
                <strong>{totalLives}</strong>&nbsp;Lives Remaining 
                </LivesWrapper>
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
  marginTop: 16,
  marginBottom: 24
};

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

const PuzzlePageContainer = styled.div`
    bottom: 0;
    left: 0;
    right: 0;
    top: 0; 
    position: absolute;
    height: 100%;
`
const PuzzlePageWrapper = styled.div`
  display: flex;
  width: 100%;
  background: linear-gradient(90deg, hsla(244, 36%, 52%, 1) 0%, hsla(214, 88%, 54%, 1) 100%);
  height: 100%;
  justify-content: center;
`

const PuzzlePageGrid = styled.div `
  display: grid;
  grid-template-columns: minmax(300px, auto) min-content;
  max-width: 100vw;
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

const PuzzleBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1;
  /* position: relative; */


  @media screen and (max-width: 900px){

  }
`

const PuzzleBoardWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 24px 0px;
    height: minmax(300px, auto);
`

const RightPuzzlePanelContainer = styled.div`
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

const LivesWrapper = styled.div`
    padding: 16px;
    display: flex;
    width: 100%;
    justify-content: center;
    color: #fff;
`

const LivesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  
`
const LivesImg = styled.img`
  max-width: 30px;
`