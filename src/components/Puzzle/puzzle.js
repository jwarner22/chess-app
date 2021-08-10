import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./PuzzleComponents/PuzzlePage";
import {baseURL} from "../api/apiConfig";
import FetchWrapper from "../api/FetchWrapper";

const API = new FetchWrapper(baseURL)

export default function Puzzle(props) {
  const {rating,theme} = props;
  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  // called on component mount
  useEffect(()=>{
    fetchPuzzles(rating,theme);
  },[]);
  
  // fetches puzzles from api
  function fetchPuzzles(rating, theme) {
    let endpoint = '/puzzles/'
    let queryParams = `?rating=${rating}&theme=${theme}`
    API.get(endpoint+queryParams).then(data => setPuzzles(data))
  }
  
  // saves results to api and sessionstorage
  function saveResults() {
    setSavingResults(true)
    let oldData = JSON.parse(sessionStorage.getItem('userPublicData'))
    let userID = sessionStorage.getItem('userID')
    //let moduleID = props.id;
    let themeData = oldData.themes.find(element => element.title === theme);
    themeData.rating += 25; // adds 25 to theme rating (needs improvement)
    themeData.completed += 1; // adds 1 to number of puzzles completed

    //need to switch to localstorage and refactor to prevent data loss if api fails    
    let endpoint = `/users/themes/${userID}`
    API.put(endpoint, themeData)
    .then(data => {
      console.log(data)
      sessionStorage.setItem('userPublicData',JSON.stringify(data))
    }).then(() => setSavingResults(false))
    .catch(e => console.log(e))
  }

  // callback function when puzzle is finished (currently only success)
 const puzzleIsFinished = (Results, result) => {
   console.log({finished: 'isFinished', outcomes: Results})
   if (result === 'succeed') {
   setOutcomes(prevOutcomes => [...prevOutcomes,Results])
   setIsFinished(true)
   saveResults();
   } else if (result === 'fail') {
    setOutcomes(prevOutcomes => [...prevOutcomes,Results])
    setFailure(prevFailure => !prevFailure)
    setIsFinished(true)
   }   
 }
 
 // style this u lil biiitch
 // render if the puzzle module is finished
 if (isFinished) {
   return(
     <>
    <strong>Nice Job!</strong>
    <p>Congrats, you scored {outcomes.filter(outcome=>outcome===true).length}/{outcomes.length}</p>
    <p>Failure? {failure}</p>
    { savingResults && <p>Saving Results...</p>}
    {(savingResults === false) &&
    <button>
    <Link to="/dashboard">Back to Dashboard</Link>
    </button>
    }
    </>
   )
 }

 // render puzzle module
  return (
    <div>
      {console.log(puzzles.length)}
      {(puzzles.length > 0) && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} />}
    </div>
  );
}
