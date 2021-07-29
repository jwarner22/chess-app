import React, { useEffect, useState } from "react";
// import "../../style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
// import OpeningPage from "./components/OpeningPage";
import swal from "sweetalert";
import { wait } from './Utilities/helpers.js';
import DemoMoves from "./Opening/DemoMoves.jsx";
import Opening from "./Opening/Opening.jsx";
import {getOpeningMoves} from './Utilities/helpers.js';
import Progress from './Utilities/Progress.jsx';

const openingMoves = "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5";

export default function Puzzle() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoIsFinished, setDemoIsFinished] = useState(false);
  const [fen, setFen] = useState();
  const [moveIndex, setMoveIndex] = useState(0);
  const [progress,setProgress] = useState(0);
  const [count,setCount] = useState(0);
  const moves = getOpeningMoves(openingMoves);

  useEffect(() => {
    swal({
      title: "Sicilain Defense",
      text: "replicate the moves..."
    }).then((value) => {
      setIsLoaded(value);
    });
  }, []);

  const demoFinished = () => {
    console.log("finished");
    setDemoIsFinished(true);
  };

  const incorrectCallback = async (currentFen, moveIndex) => {
    setFen(currentFen);
    setMoveIndex(moveIndex);
    setDemoIsFinished(false);
    wait(100);
    console.log({ "incorrect index": moveIndex });
    console.log({ "incorrect fen": currentFen });
  };

  const finishedCallback = async () => {
    console.log('finished');
    setProgress(progress + ((1/3)*100));
    setCount(count + 1);
  }

  const returnPercent = (percent) => {
    //setProgress(percent)
  }

  if (isLoaded) {
    return (
      <>
      <div>
      <div style={progressContainer}><Progress returnPercent={returnPercent} percent={progress} count={count} /></div>
        <div className="box">
          <div className="main-board green merida my-2">
            {isLoaded === true && demoIsFinished === false && (
              <DemoMoves
                moves={moves}
                demoFinished={demoFinished}
                fen={fen}
                moveIndex={moveIndex}
              />
            )}
            {isLoaded === true && demoIsFinished === true && (
              <Opening moves={moves} incorrectCallback={incorrectCallback} finishedCallback={finishedCallback} />
            )}
          </div>
        </div>
        </div>
      </>
    );
  }
  return null;

}

const progressContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 30,
  marginBottom: 40
};
