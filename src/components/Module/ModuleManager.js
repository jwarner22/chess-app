import React, { useEffect, useState, useContext } from "react";
import "./style.css";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./Puzzle/PuzzlePage";
import {baseURL} from "../../api/apiConfig";
import {calcScore, calcEloRating} from './Utilities/Scoring';
import PostPuzzle from '../PostModule/PostModule';
import useFetch from '../../api/useFetch';
import {getAnalytics, logEvent} from "firebase/analytics";
import ChessboardLoader from "../ChessBoardLoader/ChessboardLoader";

// Global context
import {UserContext} from '../../providers/GlobalState'
import { EightK } from "styled-icons/material";



export default function ModuleManager(props) {
  const [puzzles,setPuzzles] = useState([]);
  const [isFinished,setIsFinished] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [savingResults, setSavingResults] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perfect, setPerfect] = useState(false);
  const [initialRating, setInitialRating] = useState(0)
  const [userThemeData, setUserThemeData] = useState({});
  const [score, setScore] = useState(0);
  const [scoreData, setScoreData] = useState([])
  const [completedTraining, setCompletedTraining] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(0)

  // fetch Hook
  const {get} = useFetch(baseURL);
  
  // Google Analytics
  const analytics = getAnalytics();

  // global context  
  const {userData, updateUserData} = useContext(UserContext);
  const {dailyModules, updateDailyModules} = useContext(UserContext);
  const {themesData, updateThemesData} = useContext(UserContext);
  const {updateAchievements} = useContext(UserContext);
  const {loading, userId, contextLoading} = useContext(UserContext);
  const {theme,id, isDaily} = props.moduleData;
  const {rating, location} = props;

  // called on component mount
  useEffect(()=>{
    fetchPuzzles(rating,theme);
    let userThemesData = [...themesData]
    let themeData = userThemesData.filter(item => item.title === theme)[0];

    setUserThemeData(themeData);
    logEvent(analytics, 'module_started', {'user': userId, 'isDaily': isDaily});
  },[]);
  
  // fetches puzzles from api
  function fetchPuzzles(rating, theme) {
    let endpoint = '/puzzles/'
    let queryParams = `?rating=${rating}&theme=${theme}`
    //get(endpoint+queryParams).then(data => setPuzzles(data))
    setPuzzles([1,2])
  }

  // updates theme data and sends to API
  async function saveResults(outcomes, times, bonuses, ratings, elo) {

    // score change
    if (outcomes.every(result => result === true)) {
      setPerfect(true);

      updateAchievements('perfect', 0, 0, theme, "");
    };

    // filter relevant theme from user themes data
    let userThemesData = [...themesData]
    let themeData = userThemesData.filter(item => item.title === theme)[0];
    
    themeData.completed += 1; // increment completed count
    // update theme data
    //let elo = calcEloRating(outcomes,puzzles,themeData.rating, themeData.completed);
    const prevRating = (themeData.rating == null) ? 0 : themeData.rating;

    setInitialRating(prevRating)
    setUpdatedRating(elo)

    if (elo > themeData.high_rating) {
      let diff = elo - themeData.high_rating; // change from previous high rating
      themeData.high_rating = elo;     // new high rating
      updateAchievements("high_rating", elo, diff, theme, "");
    }

    themeData.rating = elo // update theme rating

    let score = calcScore(outcomes,ratings, times) // calculate score
    let bonus = bonuses.reduce((a,b) => a+b, 0) // sum bonuses
    score = score + bonus; // add bonuses to score

    if (themeData.high_score < score) {
      let diff = score - themeData.high_score; // change from previous high score
      themeData.high_score = score; // new high score!
      updateAchievements("high_score", score, diff, theme, "") // update achievements
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

    mutatedPuzzles = mutatedPuzzles.map(module => {
      if (module.location === location) {
        module.completed = true;
        module.title = theme;
        module.theme_id = id;
      } else if (module.location === location + 1) { 
        module.locked = false;
      }
      return module;
    })

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
          updateUserData({...userProfileData, 
            daily_streak: userData.daily_streak + 1, 
            last_daily: Date.now()
          }); // update streak (+1)
      }
      setCompletedTraining(true);
    }
    return mutatedPuzzles
  }

  // callback function when puzzle is finished (currently only success)
 const moduleIsFinished = async (results, outcome, times, bonuses, ratings, elo) => {

  logEvent(analytics, 'module_completed', {'user': userId, 'isDaily': isDaily}); // log module completion to firebase

   setSavingResults(true)
   setOutcomes(prevOutcomes => [...prevOutcomes,results])
   await saveResults(results, times, bonuses, ratings, elo);

   if (outcome === 'fail') setFailure(true);

    // update if daily puzzle
    if (isDaily && outcome !== 'fail') {
      let updatedDailyPuzzles = await updateDailyPuzzles();
      await updateDailyModules(updatedDailyPuzzles);
    }
    
  setSavingResults(false)
  setIsFinished(true)
 }
 
// render if saving to API
 if (savingResults | loading) {
   return(
    <ChessboardLoader />
   )
 }
 
 if (isFinished) {
   return(
     <PostPuzzle completedTraining={completedTraining} perfect={perfect} failure ={failure} outcomes={outcomes} userData={userThemeData} score={score} isDaily={isDaily} scoreData={scoreData} initialRating={initialRating} newRating={updatedRating}/>
   )
 }
 // render puzzle module
  return (
    <div>
      {(puzzles.length > 0) && <PuzzlePage themeData={userThemeData} puzzles={puzzles} moduleIsFinished={moduleIsFinished} isDaily={isDaily} theme={theme}/>}
    </div>
  );
}

