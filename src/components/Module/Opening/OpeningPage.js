import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage.js";
import DemoMoves from "./DemoMoves.jsx";
//import Opening from "./Opening/Opening.jsx";
import Opening from "./OpeningPuzzleManager";
import {getOpeningMoves} from '../Utilities/helpers.js';
import Progress, { BackButtonWrapper } from '../Utilities/Progress.js';
import OpeningNav from './OpeningNav.js';
import correctSound from "../../../assets/public_sound_standard_Confirmation.mp3";
import incorrectSound from "../../../assets/public_sound_standard_Error.mp3";
import styled from "styled-components";
import Modal from "../../UI_Kit/Modals/Modal.js";
import {Howl} from 'howler'
import {PuzzlePageContainer, 
  PuzzlePageWrapper, 
  PuzzlePageGrid, 
  PuzzleBoardContainer, 
  PuzzleBoardWrapper, 
  RightPuzzlePanelContainer, 
  PercentCompleted} from "../Puzzle/PuzzlePageElements"
import {MobileHeaderContainer, 
  MobilePuzzleWrapper} from "../Puzzle/MobilePuzzle/MobilePuzzleElements"
import BackButton from "../../BackButton.js";
import {useWindowSize} from '../../../hooks/UseWindowSize';
import OpeningModalContent from "./OpeningModalContent.js";

import useFetch from "../../../api/useFetch.js";
import { baseURL } from "../../../api/apiConfig.js";

import { UserContext } from "../../../providers/GlobalState.js";

export default function OpeningModule(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoIsFinished, setDemoIsFinished] = useState(false);
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [progress,setProgress] = useState(0);
  const [count,setCount] = useState(0);
  const [correctMoves,setCorrectMoves] = useState();
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [retryDisabled, setRetryDisabled] = useState(true);
  const [showDisabled, setShowDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [startedDemo, setStartedDemo] = useState(false);
  const [triggerNext, setTriggerNext] = useState(false);
  const [boardKey, setBoardKey] = useState(0);
  const [isOpen, setIsOpen] = useState(true)
  const [disableModal, setDisableModal] = useLocalStorage('disable_modal', 'false')

  const {moves, color} = useParams();
  const {put, post} = useFetch(baseURL);
  const {userId, updateOpeningStats, openingStats, createOpeningStats} = useContext(UserContext);

  //console.log(props)
  //if the instructions modal is disabled in localstorage, don't show modal
  useLayoutEffect(() => {
    if(disableModal === true) {
      setIsOpen(false)
    }
  }, [])

  //toggle the opening stat of the instructions modal
  const toggle = () => {
    setIsOpen(prev => !prev)
  }

  //changes the state of disableModal via an event handler on the checkbox, uses the useLocalStorage hook. 
  const handleDisableModal = () => {
    setDisableModal(!disableModal)
  }

  const incorrectSoundPlayer = new Howl({src: incorrectSound});
  const correctSoundPlayer = new Howl({src: correctSound});


  const windowSizeWidth = useWindowSize()[0];
  const [width, setWidth] = useState(windowSizeWidth);
  const isMobile = windowSizeWidth <= 640;

  const orientation = color;

  
  useEffect(() => {
    getMoves();
  }, []);

  useEffect(() => {
    if (count === 3) {
      setTimeout(finished(score), 3000);
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


  const finished = async (score) => {
    const openingId = props.location.state.currentOpening.opening_id;
    let oldOpeningStats = [...openingStats];

    // update opening in db
    const { openingMasteryRank, thisOpeningRank, newOpeningRank } = await saveModuleData(userId, openingId, put, post, updateOpeningStats, oldOpeningStats, getRank, getNextRank, createOpeningStats);

    //push to post opening page
    props.history.push({pathname: `/post-opening/${moves}/${orientation}`, state: {score: score, openingId: openingId, isDaily: false, openingMasteryRank: openingMasteryRank, thisOpeningRank: thisOpeningRank, newOpeningRank: newOpeningRank}});
  }

  // helper functions for saveModuleData
  const getNextRank = nextRank()
  const getRank = rank()

  
  const getMoves = async () => {
    const openingMoves = getOpeningMoves(moves);
    setCorrectMoves(openingMoves);
    setFen('');
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
    setScore(prev => prev + 100*(Math.floor(correctMoves.length/2)));
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
        <Modal isOpen={isOpen} toggle={toggle}>
          <OpeningModalContent isOpen={isOpen} toggle={toggle} handleDisableModal={handleDisableModal} disableModal={disableModal}/>
        </Modal>
        {isMobile ? ( <>
          <MobilePuzzleWrapper>
            <BackButtonWrapper>
              <BackButton />
            </BackButtonWrapper>
            <MobileHeaderContainer>
              <Header>{props.location.state.currentOpening.headline}</Header> 
            </MobileHeaderContainer>
           
            <PuzzleBoardWrapper>
              <div>
                {/* <div className="box">
                  <div className="main-board green merida my-2"> */}
                    {isLoaded === true && demoIsFinished === false && (
                      <DemoMoves
                      key={boardKey}
                        moves={correctMoves}
                        demoFinished={demoFinished}
                        fen={fen}
                        moveIndex={moveIndex}
                        orientation={orientation}
                        startedDemo={startedDemo}
                      />
                    )}
                    {isLoaded === true && demoIsFinished === true && (
                      <Opening key={boardKey} orientation={orientation} triggerNext={triggerNext}  count={count} correctMoves={correctMoves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} />
                    )}

                  {/* </div>
                  </div> */}
              </div>
            </PuzzleBoardWrapper>
            <div>
        <Progress category={"opening"} returnPercent={returnPercent} outcome={outcome} percent={progress} count={count}  />
        </div>
            <OpeningNav category={"opening"} onShowMovesClick={handleShowMovesClick} onRetryClick={handleRetryClick} onContinueClick={handleContinueClick} retryDisabled={retryDisabled} continueDisabled={continueDisabled} demoIsFinished={demoIsFinished} startDemo={startDemo} startedDemo={startedDemo} showDisabled={showDisabled}/>
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
                moves={correctMoves}
                demoFinished={demoFinished}
                fen={fen}
                moveIndex={moveIndex}
                orientation={orientation}
                startedDemo={startedDemo}
              />
            )}
            {isLoaded === true && demoIsFinished === true && (
              <Opening key={boardKey} orientation={orientation} triggerNext={triggerNext} count={count} correctMoves={correctMoves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} boardWidth={width} />
            )}
          {/* </div>
          </div> */}
        </div>
        </PuzzleBoardWrapper>
        </PuzzleBoardContainer>
        <RightPuzzlePanelContainer>
          <HeaderContainer>
          <Header>{props.location.state.currentOpening.headline}</Header>
        </HeaderContainer>
        <div style={progressContainer}>
        <Progress category={"opening"} returnPercent={returnPercent} outcome={outcome} percent={progress} count={count} />
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
async function saveModuleData(userId, openingId, put, post, updateOpeningStats, oldOpeningStats, getRank, getNextRank, createOpeningStats) {
  let url = `/opening-completions/${userId}/${openingId}`;
  let response = await put(url);
  if (response.detail === 'Opening not found') {
    // post new opening for user
    response = await createOpeningStats(openingId);
  }

  const concatResponse = [...response.parent_openings, response.this_opening];

  //update opening stats in global state
  let updatedOpeningStats = await updateOpeningStats(concatResponse); // update global state

  const openingMasteryRank = updatedOpeningStats.map(newOpening => {
    let oldOpening = oldOpeningStats.find(opening => newOpening.id === opening.id);

    let oldMastery = 0;
    let oldRank = '';

    if (oldOpening == null) {
      oldRank = 'Newbie';
    } else {
      oldMastery = oldOpening.history_7;
      oldRank = getRank(oldMastery);
    }
    let newMastery = newOpening.history_7;
    let masteryDiff = newMastery - oldMastery;
    let newRank = getRank(newMastery);
    let nextRank = getNextRank(newRank);

    return { opening_id: newOpening.opening_id, oldRank: oldRank, newRank: newRank, nextRank: nextRank, diff: masteryDiff };
  });

  const thisOpeningRank = openingMasteryRank.find(opening => opening.opening_id === openingId);
  const newOpeningRank = openingMasteryRank.filter(rank => rank.newRank !== rank.oldRank);
  return { openingMasteryRank, thisOpeningRank, newOpeningRank };
}

function rank() {
  return (mastery) => {
    //set mastery equation = to precentile (20, 40, etc.) and solve for x (mastery)
    if (mastery === 0) {
      return 'Newbie';
    } else if (mastery < 250) {
      return 'Beginner';
    } else if (mastery === 667) {
      return 'Intermediate';
    } else if (mastery === 1500) {
      return 'Advanced';
    } else if (mastery === 4000) {
      return 'Expert';
    } else if (mastery === 20000) {
      return 'Master';
    } else if (mastery === 30000) {
      return 'Grandmaster';
    } else if (mastery === 50000) {
      return 'Legendary';
    }
  };
}

function nextRank() {
  return (rank) => {
    switch (rank) {
      case 'Newbie':
        return { name: 'Beginner', value: 250 };
      case 'Beginner':
        return { name: 'Intermediate', value: 667 };
      case 'Intermediate':
        return { name: 'Advanced', value: 1500 };
      case 'Advanced':
        return { name: 'Expert', value: 4000 };
      case 'Expert':
        return { name: 'Master', value: 20000 };
      case 'Master':
        return { name: 'BegGrandmaster', value: 30000 };
      case 'Grandmaster':
        return { name: 'Legendary', value: 50000 };
      default:
        return { name: 'Beginner', value: 250 };
    }
  };
}

