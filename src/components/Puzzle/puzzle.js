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
  const {rating,theme,id, isDaily} = props;
  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perfect, setPerfect] = useState(false);
  const [userData, setUserData] = useState();
  const {get,put} = useFetch(baseURL);
  const userID = localStorage.getItem('userID')

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
  
  const fetchThemeData = async () => {
    try {
      const data = await get(`/users/${userID}/themes/${theme}`);
      return data;
    } catch {
      return null;
    }
  
  }

  const updateThemeData = (themeData) => {
    let endpoint = `/users/themes/${userID}`
    put(endpoint, themeData)
    .then(data => {
      //localStorage.setItem('userPublicData',JSON.stringify(data))
    }).then(() => setSavingResults(false))
    .catch(e => console.log(e))

  }

  // saves results to api and localStorage
  async function saveResults(results) {
    //let oldData = JSON.parse(localStorage.getItem('userPublicData'))
    //let userID = localStorage.getItem('userID')
    //let moduleID = props.id;

    const themeData = await fetchThemeData() // gets theme data from API
    console.log({themeData: themeData})
    //let themeData = oldData.themes.find(element => element.title === theme);

    // score change
    if (results.every(result => result === true)) {
      themeData.rating += 100
      setPerfect(true)
    } else {
      themeData.rating += 50
    }

    themeData.completed += 1; // adds 1 to number of puzzles completed

    setUserData(themeData) // sets user data to pass as props to post puzzle page
    
    updateThemeData(themeData)  // updates data in piu

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

   setSavingResults(true)
   if (result === 'succeed') {
   setOutcomes(prevOutcomes => [...prevOutcomes,results])
   setIsFinished(true)
   saveResults(results);

   // update if daily puzzle
   if (isDaily)    updateDailyPuzzles();

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
