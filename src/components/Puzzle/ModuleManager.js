import React, { useEffect, useState } from "react";
import "./style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./PuzzleComponents/PuzzlePage";
import {baseURL} from "../api/apiConfig";
import {calcScore, calcEloRating} from './Utilities/Scoring';
import PostPuzzle from '../PostModule/PostModule';
import useFetch from '../api/useFetch';
import Loader from '../Loader';

export default function Puzzle(props) {
  console.log(props)
  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perfect, setPerfect] = useState(false);
  const [userData, setUserData] = useState({});
  const [score, setScore] = useState(0);
  const [scoreData, setScoreData] = useState([])
  const {get,put, post} = useFetch(baseURL);


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
      const data = await get(`/users/${userID}/themes/${theme}`);
      return data;
    } catch {
      return null;
    }
  
  }

  // updates theme after completing module
  const updateThemeData = async (themeData) => {
    let endpoint = `/users/${userID}/themes`
    put(endpoint, themeData)
    .then(data => {
      //localStorage.setItem('userPublicData',JSON.stringify(data))
    }).then(() => setSavingResults(false))
    .catch(e => console.log(e))

  }

  async function setAchievement(category, value) {
    let endpoint = `/achievements/${userID}`
    let now = Date.now()
    post(endpoint, {
      inserted_at: now,
      category: category,
      value: value,
      theme: theme
    })
  }

  async function fetchProfileData() {
    let endpoint = `/users/${userID}`;
    try {
      let profileData = await get(endpoint)
      return profileData
    } catch(e) {
      alert(e)
    }
  }

  async function setProfileData(profileData) {
    let endpoint = `/users/${userID}`;
    try {
      put(endpoint, profileData)
    } catch(e) {
      alert(e)
    }

  }

  // updates theme data and sends to API
  async function saveResults(outcomes) {
    //let oldData = JSON.parse(localStorage.getItem('userPublicData'))

    const themeData = await fetchThemeData() // gets theme data from API
    // score change
    if (outcomes.every(result => result === true)) {
      setPerfect(true);
      setAchievement('perfect', 0);
    };
  
    let newRating = calcEloRating(outcomes,puzzles,themeData.rating);
    
    //if (themeData.rating < newRating) {
      // new high rating
      // need high rating parameter
    //}
    console.log({newRating: newRating})
    console.log({themeDataHighRating: themeData.high_rating})
    if (newRating > themeData.high_rating) {
      // new high rating
      console.log('new high rating')
      themeData.high_rating = newRating;
      setAchievement("high_rating", newRating);
    }
    themeData.rating = newRating
    themeData.completed += 1; // adds 1 to number of puzzles completed
    

    let score = calcScore(outcomes,puzzles)
    if (themeData.high_score < score) {
      // new high score!
      themeData.high_score = score;
      setAchievement("high_score", score)
    }

    setScore(score)

    // update theme score record here
    let str = themeData.score_history;
    let score_array = str.split(",").map(Number);


    score_array.shift();
    score_array.push(score)

    themeData.score_history = score_array.toString();
    let score_data = score_array.map((value, index) => {
      return(
        {
          name: index.toString(),
          score: value
        }
      )
    });

    setScoreData(score_data)
        
    await updateThemeData(themeData)  // updates data in piu
    
    setUserData(themeData) // sets user data to pass as props to post puzzle page

    let profileData = await fetchProfileData()
    let newOverallRating = calcEloRating(outcomes, puzzles, profileData.overall_rating)
    profileData.overall_rating = newOverallRating;
    profileData.total_score += score ;
    profileData.puzzles_completed += outcomes.length;
    profileData.puzzles_correct += outcomes.filter(outcome => outcome === true).length;

    setProfileData(profileData)

  }

  // updates daily puzzle data based on completion
  const updateDailyPuzzles = async () => {
    //const storedDailyPuzzles = JSON.parse(localStorage.getItem('dailyPuzzles'));
    
    // was storedDailyPuzzles
    const mutatedPuzzles = schemaPicks.map(puzzle => {
      if (puzzle.theme_id === id) {
        return {...puzzle, completed: true, locked: false}
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
   

   } else if (result === 'fail') {
    setOutcomes(prevOutcomes => [...prevOutcomes,results])
    await saveResults(results);
    setFailure(true)
    setIsFinished(true)
    setSavingResults(false)
   }   
   setIsFinished(true)
 }
 
// render if saving to API
 if (savingResults) {
   return(
    <Loader />
   )
 }
 
 if (isFinished) {
   return(
     <PostPuzzle perfect={perfect} failure ={failure} outcomes={outcomes} userData={userData} score={score} isDaily={isDaily} scoreData={scoreData}/>
   )

 }

 // render puzzle module
  return (
    <div>
      {(puzzles.length > 0) && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} isDaily={isDaily} theme={theme}/>}
    </div>
  );
}

