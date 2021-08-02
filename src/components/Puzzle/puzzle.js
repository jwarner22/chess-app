import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./PuzzleComponents/PuzzlePage";
// import {puzzleData} from './data.js'

export default function Puzzle(props) {
  const {rating,theme} = props;
  const [puzzles,setPuzzles] = useState();
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  // const puzzles = puzzleData;
  useEffect(()=>{
    fetchPuzzles(rating,theme);
  },[rating,theme]);

  useEffect(() => {
    console.log('save data when finished')
    // test of getting user ID (works)
    const userID = sessionStorage.getItem('userID');
    console.log(userID)
    const moduleID = props.id;
    console.log(moduleID);
    // first post results to local storage and change relevant context
    // post results to database
    // add 'isSaved' state and conditionally render link to dashboard

  },[isFinished])
  
  function fetchPuzzles(rating, theme) {
    const baseUrl = 'http://127.0.0.1:8000/puzzles/'
    const queryParams = `?rating=${rating}&theme=${theme}`
    fetch(baseUrl + queryParams).then(response => response.json()).then(data => {
      setPuzzles(data);
    })
  }
  
 const puzzleIsFinished = (outcomes) => {
   console.log({finished: 'isFinished', outcomes: outcomes})
   setOutcomes(prevOutcomes => [...prevOutcomes,outcomes])
   setIsFinished(true)
 }
 
 // render if the puzzle module is finished
 if (isFinished) {
   return(
     <>
    <strong>Nice Job!</strong>
    <p>Congrats, you scored {outcomes.filter(outcome=>outcome===true).length}/{outcomes.length}</p>
    <button>
    <Link to="/dashboard">Back to Dashboard</Link>
    </button>
     </>
   )
 }

 // render puzzle module
  return (
    <div>
      {puzzles && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} />}
    </div>
  );
}
