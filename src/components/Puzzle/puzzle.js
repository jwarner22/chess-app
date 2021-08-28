import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./PuzzleComponents/PuzzlePage";
import {baseURL} from "../api/apiConfig";
//import FetchWrapper from "../api/FetchWrapper";
import PostPuzzle from '../../PostPuzzleMockup/PostPuzzleMockup'
import useFetch from '../api/useFetch';
import Loader from '../../Preloader';

export default function Puzzle(props) {
  const {rating,theme,id} = props;
  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perfect, setPerfect] = useState(false);
  const [userData, setUserData] = useState();
  const {get,put} = useFetch(baseURL);

  // called on component mount
  useEffect(()=>{
    fetchPuzzles(rating,theme);
  },[]);
  
  // fetches puzzles from api
  function fetchPuzzles(rating, theme) {
    let endpoint = '/puzzles/'
    let queryParams = `?rating=${rating}&theme=${theme}`
    get(endpoint+queryParams).then(data => setPuzzles(data))
  }
  
  // saves results to api and localStorage
  function saveResults(results) {
    let oldData = JSON.parse(localStorage.getItem('userPublicData'))
    let userID = localStorage.getItem('userID')
    //let moduleID = props.id;
    let themeData = oldData.themes.find(element => element.title === theme);
    console.log({themeData: themeData})
    // score change
    if (results.every(result => result === true)) {
      themeData.rating += 100
      console.log('perfect')
      setPerfect(true)
    } else {
      themeData.rating += 50
    }

    themeData.completed += 1; // adds 1 to number of puzzles completed

    setUserData(themeData)
    
    let endpoint = `/users/themes/${userID}`
    put(endpoint, themeData)
    .then(data => {
      console.log(data)
      localStorage.setItem('userPublicData',JSON.stringify(data))
    }).then(() => setSavingResults(false))
    .catch(e => console.log(e))

  }

  const updateDailyPuzzles = () => {
    // updates daily puzzles using localStorage (need to add API)
    const storedDailyPuzzles = JSON.parse(localStorage.getItem('dailyPuzzles'));
    const mutatedPuzzles = storedDailyPuzzles.map(puzzle => {
      if (puzzle.id === id) {
        return {...puzzle, completed: true, locked: true}
      }
      return puzzle
    })
    const thisIndex = mutatedPuzzles.findIndex(puzzle => puzzle.id === id)
    // check if last puzzle
    if (thisIndex+1 < mutatedPuzzles.length) {
      mutatedPuzzles[thisIndex+1].locked = false; // unlock next puzzle
      // daily puzzle splash screen call here
    }
    // save to localStorage
    localStorage.setItem('dailyPuzzles',JSON.stringify(mutatedPuzzles));
  }

  // callback function when puzzle is finished (currently only success)
 const puzzleIsFinished = (results, result) => {
   console.log({finished: 'isFinished', outcomes: results})
   setSavingResults(true)
   if (result === 'succeed') {
   setOutcomes(prevOutcomes => [...prevOutcomes,results])
   setIsFinished(true)
   saveResults(results);
   // needs to be conditional on if it's a daily puzzle
   updateDailyPuzzles();
   } else if (result === 'fail') {
    setOutcomes(prevOutcomes => [...prevOutcomes,results])
    setFailure(true)
    setIsFinished(true)
   }   
 }
 

 // render if the puzzle module is finished
 if (savingResults) {
   return(
    <Loader />
   )
 }
 if (isFinished) {
   return(
     <PostPuzzle perfect={perfect} failure ={failure} outcomes={outcomes} savingResults={savingResults} userData={userData}/>
   )

 }

 // render puzzle module
  return (
    <div>
      {(puzzles.length > 0) && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} />}
    </div>
  );
}
