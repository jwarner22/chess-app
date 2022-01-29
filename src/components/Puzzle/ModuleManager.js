import React, { useEffect, useState, useContext } from "react";
import "./style.css";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./PuzzleComponents/PuzzlePage";
import {baseURL} from "../api/apiConfig";
import {calcScore, calcEloRating} from './Utilities/Scoring';
import PostPuzzle from '../PostModule/PostModule';
import useFetch from '../api/useFetch';
import Loader from '../Loader';
import {getAnalytics, logEvent} from "firebase/analytics";

// Global context
import {UserContext} from '../../GlobalState'


export default function Puzzle(props) {
  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perfect, setPerfect] = useState(false);
  const [userThemeData, setUserThemeData] = useState({});
  const [score, setScore] = useState(0);
  const [scoreData, setScoreData] = useState([])
  const [completedTraining, setCompletedTraining] = useState(false);
  
  // fetch Hook
  const {get} = useFetch(baseURL);
  
  // Google Analytics
  const analytics = getAnalytics();

  // global context  
  const {userData, updateUserData} = useContext(UserContext);
  const {dailyModules, updateDailyModules} = useContext(UserContext);
  const {themesData, updateThemesData} = useContext(UserContext);
  const {updateAchievements} = useContext(UserContext);
  const {loading, userId} = useContext(UserContext);

  const {theme,id, isDaily} = props.moduleData;
  const {rating, location} = props;

  // called on component mount
  useEffect(()=>{
    fetchPuzzles(rating,theme);
    logEvent(analytics, 'module_started', {'user': userId, 'isDaily': isDaily});
  },[]);
  
  // fetches puzzles from api
  function fetchPuzzles(rating, theme) {
    let endpoint = '/puzzles/'
    let queryParams = `?rating=${rating}&theme=${theme}`
    get(endpoint+queryParams).then(data => setPuzzles(data))
  }

  // updates theme data and sends to API
  async function saveResults(outcomes, times) {

    // score change
    if (outcomes.every(result => result === true)) {
      setPerfect(true);
      updateAchievements('perfect', 0, 0, theme);
    };

    // filter relevant theme from user themes data
    let userThemesData = [...themesData]
    let themeData = userThemesData.filter(item => item.title === theme)[0];

    // update theme data
    let newRating = calcEloRating(outcomes,puzzles,themeData.rating, themeData.completed);

    if (newRating > themeData.high_rating) {
      let diff = newRating - themeData.high_rating; // change from previous high rating
      themeData.high_rating = newRating;     // new high rating
      updateAchievements("high_rating", newRating, diff, theme);
    }
    themeData.rating = newRating
    themeData.completed += 1; // adds 1 to number of puzzles completed
    
    let score = calcScore(outcomes,puzzles, times) // calculate score
    if (themeData.high_score < score) {
      let diff = score - themeData.high_score; // change from previous high score
      themeData.high_score = score; // new high score!
      updateAchievements("high_score", score, diff, theme) // update achievements
    }

    setScore(score) // set score state
    let str = themeData.score_history; // update theme score record
    let score_array = str.split(",").map(Number);
    score_array.shift();
    score_array.push(score);
    themeData.score_history = score_array.toString();
    let score_data = score_array.map((value, index) => {
      return(
        {
          name: index.toString(),
          score: value
        }
      )
    });
    setScoreData(score_data); // set score data state
  

    await updateThemesData(themeData)  // updates data in api
    setUserThemeData(themeData) // sets user data to pass as props to post puzzle page

    let profileData = {...userData}
    profileData.total_score += score ;
    profileData.puzzles_completed += outcomes.length;
    profileData.puzzles_correct += outcomes.filter(outcome => outcome === true).length;

    updateUserData(profileData) // update userData state
  }

  // updates daily puzzle data based on completion
  const updateDailyPuzzles = async () => {
    
    let mutatedPuzzles = [...dailyModules]
    mutatedPuzzles[location].completed = true;
    mutatedPuzzles[location].title = theme;
    mutatedPuzzles[location].theme_id = id;

    if (location < mutatedPuzzles.length - 1) mutatedPuzzles[location+1].locked = false;

    if (mutatedPuzzles.every(puzzle => puzzle.completed === true)) {
      // record daily training completion => firebase
      logEvent(analytics, 'daily_training_completed', {'user': userId});

      let userProfileData = {...userData};
      let now = new Date();

      if (userProfileData.lastDaily == null) { // if new user, set daily streak to 1
        updateUserData({...userProfileData, daily_streak: 1, last_daily: Date.now()})
      }

      let lastDaily = new Date(userProfileData.last_daily);
      // update user daily streak info
      if (lastDaily.getDate() !== now.getDate()) { // ensure no same day streak increase
        if (lastDaily.getDate() === (now.getDate() - 1)) { // ensure last daily completion was yesterday
          updateUserData({...userProfileData, daily_streak: userData.daily_streak + 1, last_daily: Date.now()}); // update streak (+1)
        } else {
          updateUserData({...userProfileData, daily_streak: 1, last_daily: Date.now()}); // reset streak to 1
        }
      }
      setCompletedTraining(true);
    }

    return mutatedPuzzles
  }

  // callback function when puzzle is finished (currently only success)
 const puzzleIsFinished = async (results, result, times) => {
   
   logEvent(analytics, 'module_completed', {'user': userId, 'isDaily': isDaily}); // log module completion to firebase

   setSavingResults(true)
   setOutcomes(prevOutcomes => [...prevOutcomes,results])
   await saveResults(results, times);

   if (result === 'fail') setFailure(true);

    // update if daily puzzle
    if (isDaily) {
      let updatedDailyPuzzles = await updateDailyPuzzles();
      await updateDailyModules(updatedDailyPuzzles);
    }
    
  setSavingResults(false)
  setIsFinished(true)
 }
 
// render if saving to API
 if (savingResults | loading) {
   return(
    <Loader />
   )
 }
 
 if (isFinished) {
   return(
     <PostPuzzle completedTraining={completedTraining} perfect={perfect} failure ={failure} outcomes={outcomes} userData={userThemeData} score={score} isDaily={isDaily} scoreData={scoreData}/>
   )
 }

 // render puzzle module
  return (
    <div>
      {(puzzles.length > 0) && <PuzzlePage puzzles={puzzles} puzzleIsFinished={puzzleIsFinished} isDaily={isDaily} theme={theme}/>}
    </div>
  );
}

