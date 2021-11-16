import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { wait } from './Utilities/helpers.js';
import DemoMoves from "./Opening/DemoMoves.jsx";
import Opening from "./Opening/Opening.jsx";
import {getOpeningMoves} from './Utilities/helpers.js';
import Progress from './Utilities/Progress.jsx';
import correctSound from "../../assets/public_sound_standard_Confirmation.mp3";
import incorrectSound from "../../assets/public_sound_standard_Error.mp3";
import styled from "styled-components";

import {Howl} from 'howler'


export default function OpeningModule(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoIsFinished, setDemoIsFinished] = useState(false);
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [progress,setProgress] = useState(0);
  const [count,setCount] = useState(0);
  const [moves,setMoves] = useState();
  const [orientation, setOrientation] = useState("");
  const incorrectSoundPlayer = new Howl({src: incorrectSound});
  const correctSoundPlayer = new Howl({src: correctSound});
  const OpeningsData = props.location.state.module;
  
  useEffect(() => {

    getMoves();

    swal({
      title: OpeningsData.headline,
      text: "replicate the moves..."
    }).then((value) => {
      setIsLoaded(value);
    });
    setOrientation('white');
  }, []);

  useEffect(() => {
    if (count === 3) {
      swal({
        title: "Completed!",
        text: OpeningsData.headline
      }).then((value) => {
        //console.log(value)
      });
    }
  },[count])

  const getMoves = () => {
    let moves = OpeningsData.moves;
    const openingMoves = getOpeningMoves(moves);
    setMoves(openingMoves)
    setFen(openingMoves[0].fen);
    setMoveIndex(0);
    setProgress(0);
    setCount(0);
  }

  const demoFinished = () => {
    console.log("demo finished");
    setDemoIsFinished(true);
  };

  const incorrectCallback = async (currentFen, moveIndex) => {
    setFen(currentFen);
    setMoveIndex(moveIndex);
    setDemoIsFinished(false);
    incorrectSoundPlayer.play();
  };

  const finishedCallback = async () => {
    correctSoundPlayer.play();
    setProgress(progress + ((1/3)*100));
    setCount(count + 1);
  }

  const returnPercent = (percent) => {
    //setProgress(percent)
  }

  if (isLoaded) {
    return (
      <>
      <PuzzlePageContainer>
        <HeaderContainer>
        <Header>{OpeningsData.headline}</Header>
        {/* {(moveColor === "white") ? (
          <WhiteIndicator /> ) : (
            <BlackIndicator />
          )} */}
        </HeaderContainer>
      <div style={progressContainer}><Progress returnPercent={returnPercent} percent={progress} count={count} /></div>
        <PuzzleBoardWrapper>
        <div style={boardContainer}>
        <div className="box">
          <div className="main-board green merida my-2">
            {isLoaded === true && demoIsFinished === false && (
              <DemoMoves
                moves={moves}
                demoFinished={demoFinished}
                fen={fen}
                moveIndex={moveIndex}
                orientation={orientation}
              />
            )}
            {isLoaded === true && demoIsFinished === true && (
              <Opening moves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} orientation={orientation} />
            )}
          </div>
          </div>
        </div>
        </PuzzleBoardWrapper>
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
  width: "100vw",
  marginTop: 24,
  marginBottom: 30,
  position: 'relative',
  zIndex: 0
};

const progressContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "0 auto",
  maxWidth: "1080px"
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
  grid-gap: 24px;
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