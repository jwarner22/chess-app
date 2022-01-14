import {useState, useEffect} from 'react'

import PostOpeningPage from '../../PostLogin/Views/Openings/PostOpeningPage';
import PreOpeningPage from '../../PostLogin/Views/Openings/PreOpeningPage';
import OpeningPage from '../OpeningPage.js'
import useFetch from '../../api/useFetch';
import {baseURL} from '../../api/apiConfig';
import {getAnalytics, logEvent} from "firebase/analytics";

// need to add to opening route and clean up props for child components and this componen
export default function OpeningManager(props) {
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreData, setScoreData] = useState([]);
    const {get, put, post} = useFetch(baseURL);
    const openingData = props.location.state.module;
    const schemaPicks = props.location.state.schemaPicks;
    const isDaily = props.location.state.isDaily;
    const userID = localStorage.getItem('userID');
    const analytics = getAnalytics();

    const togglePrePuzzleCallback = () => {
        setIsFinished(false);
        setIsStarted(true);
        logEvent(analytics, 'opening_started', {'user': userID, 'isDaily': isDaily});
    }

    const saveResults = async (result) => {
        const userId = localStorage.getItem('userID')
        const openingId = openingData.id;
        const userOpeningData = JSON.parse(sessionStorage.getItem('userOpeningData'));
        
        let completed = userOpeningData.completed + 1;
        let highScore = (result > userOpeningData.high_score) ? result : userOpeningData.high_score;
        
        // set high score achievement
        if (result > userOpeningData.high_score) {
          await SetAchievements(result);
        }

        let score_array = userOpeningData.score_history.split(",").map(Number);
        score_array.shift();
        score_array.push(result);
        score_array.toString();

        let score_data = score_array.map((value, index) => {
            return(
              {
                name: index.toString(),
                score: value
              }
            )
          });
      
        setScoreData(score_data)

        try {
            // update database
            await put(`/openings/${userId}/${openingId}`,{
                ...userOpeningData,
                score: result,
                completed: completed,
                high_score: highScore,
                score_history: score_array.toString()
            })
            // save to session storage
            sessionStorage.setItem('userOpeningData', JSON.stringify({
                ...userOpeningData,
                score: result,
                completed: completed,
                high_score: highScore,
                score_history: score_array.toString()
            }));

            return
        } catch (error) {
            alert(error)
        }
    }

    // update daily module
    const updateDailyModules = async () => {
        
        const mutatedPuzzles = schemaPicks.map(puzzle => {
          if (puzzle.theme_id === openingData.id) {
            return {...puzzle, completed: true, locked: false}
          } 
          return puzzle
        })
        
        // find module index
        const thisIndex = mutatedPuzzles.findIndex(puzzle => puzzle.theme_id === openingData.id)
    
        // unlocks next module
        mutatedPuzzles.map(puzzle => {
          if (puzzle.location === (mutatedPuzzles[thisIndex].location + 1)) {
            return puzzle.locked = false;
          } 
          return puzzle
        })


        // check for completed daily training
        if (mutatedPuzzles.every(puzzle => puzzle.completed === true)) {
          // record daily training completion => firebase
          logEvent(analytics, 'daily_training_completed', {'user': userID});

          // user profile endpoint
          let endpoint = `/users/${userID}`;
          //get user daily streak info
          let userProfileData = await get(endpoint);

          let now = new Date();
          // if new user, set daily streak to 1
          if (userProfileData.lastDaily == null) {
            put(endpoint, {
              ...userProfileData,
              daily_streak: 1,
              last_daily: Date.now()
            })
          }
    
          let lastDaily = new Date(userProfileData.last_daily);
          // update user daily streak info
          if (lastDaily.getDate() !== now.getDate()) { // ensure no same day streak increase
            if (lastDaily.getDate() === (now.getDate() - 1)) { // ensure last daily completion was yesterday
              // update streak (+1)
              put(endpoint, {
                ...userProfileData,
                daily_streak: userProfileData.daily_streak + 1,
                last_daily: Date.now()
              })
            } else {
              // reset streak to 1
              put(endpoint, {
                ...userProfileData,
                daily_streak: 1,
                last_daily: Date.now()
              })
            }
          }
        }

        return mutatedPuzzles
      }
    
      const saveDailyModules = async (mutatedPuzzles) => {
        let userID = localStorage.getItem('userID');
        // save daily puzzles to api here
        let endpoint = `/users/${userID}/daily_puzzles`;
        put(endpoint, mutatedPuzzles)
        .catch(error => alert(error))
      }
    
    const SetAchievements = async (result) => {
        let userID = localStorage.getItem('userID');
        let endpoint = `/achievements/${userID}`;
        let now = Date.now();
  
        let achievement =  {
          inserted_at: now,
          category: 'high_score',
          value: result,
          theme: openingData.type_ref
        }

        post(endpoint, achievement)
        .catch(error => alert(error))
    }
    
    const toggleFinished = async (result) => {
        await saveResults(result);
        if (isDaily) {
          let updatedDailyModules = await updateDailyModules();
          await saveDailyModules(updatedDailyModules);
        }
        setScore(result);
        setIsFinished(true);
        setIsStarted(false);
        logEvent(analytics, 'opening_completed', {'user': userID, 'isDaily': isDaily});
    }

    return (
        <>
        {!isStarted && !isFinished && (
            <PreOpeningPage togglePrePuzzleCallback={togglePrePuzzleCallback} openingData={openingData}/>
        )}
        {isStarted && !isFinished && (
            <OpeningPage toggleFinished={toggleFinished} openingData={openingData}/>
        )}
        {isFinished && (
            <PostOpeningPage openingData={openingData} isDaily={isDaily} score={score} scoreData={scoreData}/>
        )}
        </>
    )
}