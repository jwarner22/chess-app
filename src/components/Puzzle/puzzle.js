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
  const [perfect, setPerfect] = useState(true);
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
  
  // saves results to api and localStorage
  function saveResults(results) {
    setSavingResults(true)
    let oldData = JSON.parse(localStorage.getItem('userPublicData'))
    let userID = localStorage.getItem('userID')
    //let moduleID = props.id;
    let themeData = oldData.themes.find(element => element.title === theme);
  
    // score change
    let tried = results.length;
    let succeeded = results.filter(result => result === true).length;
    console.log({tried: tried, succeeded: succeeded})
    if (succeeded === tried) {
      themeData.rating += 100
      setPerfect(true)
    } else {
      themeData.rating += 50
    }

    themeData.completed += 1; // adds 1 to number of puzzles completed

    //need to switch to localstorage and refactor to prevent data loss if api fails    
    let endpoint = `/users/themes/${userID}`
    API.put(endpoint, themeData)
    .then(data => {
      console.log(data)
      localStorage.setItem('userPublicData',JSON.stringify(data))
    }).then(() => setSavingResults(false))
    .catch(e => console.log(e))
  }

  // callback function when puzzle is finished (currently only success)
 const puzzleIsFinished = (results, result) => {
   console.log({finished: 'isFinished', outcomes: results})
   if (result === 'succeed') {
   setOutcomes(prevOutcomes => [...prevOutcomes,results])
   setIsFinished(true)
   saveResults(results);
   } else if (result === 'fail') {
    setOutcomes(prevOutcomes => [...prevOutcomes,results])
    setFailure(true)
    setIsFinished(true)
   }   
 }
 
 // style this u lil biiitch
 // render if the puzzle module is finished
 if (isFinished) {
   return(
     <>
    {!failure && <strong>Nice Job!</strong>}
    {perfect && <strong>Congrats, Perfect Score!</strong>}
    {failure && <strong>Module Failed</strong>}
    {savingResults && <p>Saving Results...</p>}
    {!savingResults &&
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
      {(puzzles.length > 0) && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} />}
    </div>
  );
}
