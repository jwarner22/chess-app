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

  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perfect, setPerfect] = useState(false);
  const [userData, setUserData] = useState({});
  const {get,put} = useFetch(baseURL);

  const {rating,theme,id, isDaily} = props;
  const schemaPicks = props.schemaPicks;

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
  
  // fetches relevant user theme data from API
  const fetchThemeData = async () => {
    try {
      console.log({theme: theme})
      const data = await get(`/users/${userID}/themes/${theme}`);
      return data;
    } catch {
      return null;
    }
  
  }

  // updates theme after completing module
  const updateThemeData = async (themeData) => {
    let endpoint = `/users/themes/${userID}`
    put(endpoint, themeData)
    .then(data => {
      //localStorage.setItem('userPublicData',JSON.stringify(data))
    }).then(() => setSavingResults(false))
    .catch(e => console.log(e))

  }

  // updates theme data and sends to API
  async function saveResults(results) {
    //let oldData = JSON.parse(localStorage.getItem('userPublicData'))

    const themeData = await fetchThemeData() // gets theme data from API
    // score change
    if (results.every(result => result === true)) {
      themeData.rating += 50
      setPerfect(true)
    } else {
      themeData.rating += 25
    }

    themeData.completed += 1; // adds 1 to number of puzzles completed
    await updateThemeData(themeData)  // updates data in piu
    setUserData(themeData) // sets user data to pass as props to post puzzle page

  }

  // updates daily puzzle data based on completion
  const updateDailyPuzzles = async () => {
    //const storedDailyPuzzles = JSON.parse(localStorage.getItem('dailyPuzzles'));
    
    // was storedDailyPuzzles
    const mutatedPuzzles = schemaPicks.map(puzzle => {
      if (puzzle.theme_id === id) {
        return {...puzzle, completed: true, locked: true}
      }
      return puzzle
    })
    
    // find module index
    const thisIndex = mutatedPuzzles.findIndex(puzzle => puzzle.theme_id === id)

    // unlocks next module
    mutatedPuzzles.map(puzzle => {
      if (puzzle.location === (mutatedPuzzles[thisIndex].location + 1)) {
        return puzzle.locked = false;
      } 
      return puzzle
    })

    // add completed all (i.e. mutatedPuzzles.all(...completed)) splash screen here

    // save to localStorage
    //localStorage.setItem('dailyPuzzles',JSON.stringify(mutatedPuzzles));
    //await saveDailyPuzzles(mutatedPuzzles);
    return mutatedPuzzles
  }

  const saveDailyPuzzles = async (mutatedPuzzles) => {
    // save daily puzzles to api here
    let endpoint = `/users/${userID}/daily_puzzles`;
    put(endpoint, mutatedPuzzles)
    .catch(error => alert(error))
    .finally(() => setSavingResults(false))
  }

  // callback function when puzzle is finished (currently only success)
 const puzzleIsFinished = async (results, result) => {

   setSavingResults(true)
   if (result === 'succeed') {
   setOutcomes(prevOutcomes => [...prevOutcomes,results])
   await saveResults(results);

   // update if daily puzzle
   if (isDaily) {
    let updatedDailyPuzzles = await updateDailyPuzzles();
    await saveDailyPuzzles(updatedDailyPuzzles)
   }
   setIsFinished(true)

   } else if (result === 'fail') {
    setOutcomes(prevOutcomes => [...prevOutcomes,results])
    setFailure(true)
    setIsFinished(true)
   }   
 }
 
// render if saving to API
 if (savingResults) {
   return(
    <Loader />
   )
 }
 
 if (isFinished) {
   return(
     <PostPuzzle perfect={perfect} failure ={failure} outcomes={outcomes} userData={userData}/>
   )

 }

 // render puzzle module
  return (
    <div>
      {(puzzles.length > 0) && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} />}
    </div>
  );
}
