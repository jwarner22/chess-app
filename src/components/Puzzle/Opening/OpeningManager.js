import {useState, useContext} from 'react'

import PostOpeningPage from '../../PostLogin/Views/Openings/PostOpeningPage';
import PreOpeningPage from '../../PostLogin/Views/Openings/PreOpeningPage';
import OpeningPage from '../OpeningPage.js'
// import useFetch from '../../api/useFetch';

// import {baseURL} from '../../api/apiConfig';
import {getAnalytics, logEvent} from "firebase/analytics";

// Global context
import {UserContext} from '../../../GlobalState';

// need to add to opening route and clean up props for child components and this componen
export default function OpeningManager(props) {
    // state
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreData, setScoreData] = useState([]);
    const [orientation, setOrientation] = useState('');
    const [completedTraining, setCompletedTraining] = useState(false);
    
    // hooks
    const {userId, openings, updateOpenings, updateDailyModules, userData, updateUserData, updateAchievements} = useContext(UserContext)
    const analytics = getAnalytics();

    // from props
    const openingData = props.location.state.module;
    const schemaPicks = props.location.state.schemaPicks;
    const isDaily = props.location.state.isDaily;

    const togglePrePuzzleCallback = (color) => {
        setIsFinished(false);
        setIsStarted(true);
        setOrientation(color);
        logEvent(analytics, 'opening_started', {'user': userId, 'isDaily': isDaily});
    }

    const saveResults = async (result) => {
        const openingId = openingData.id;
        // const userOpeningData = JSON.parse(sessionStorage.getItem('userOpeningData'));
        console.log({openings: openings, openingData: openingData})
        let userOpeningData = openings.find(opening => parseInt(opening.opening_id) === openingData.id)

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

        // update database
        let data = {
              ...userOpeningData,
              score: result,
              completed: completed,
              high_score: highScore,
              score_history: score_array.toString()
        }
        
        updateOpenings(openingId, data)
            
            //(`/openings/${userId}/${openingId}`,{
            //     ...userOpeningData,
            //     score: result,
            //     completed: completed,
            //     high_score: highScore,
            //     score_history: score_array.toString()
            // })

            // save to session storage
            // sessionStorage.setItem('userOpeningData', JSON.stringify({
            //     ...userOpeningData,
            //     score: result,
            //     completed: completed,
            //     high_score: highScore,
            //     score_history: score_array.toString()
            // }));
    }

    // update daily module
    const putDailyModules = async () => {
        
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
          logEvent(analytics, 'daily_training_completed', {'user': userId});


          let userProfileData = {...userData};

          let now = new Date();
          // if new user, set daily streak to 1
          if (userProfileData.lastDaily == null) {
            updateUserData({              
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
              updateUserData({
                ...userProfileData,
                daily_streak: userProfileData.daily_streak + 1,
                last_daily: Date.now()
              })
            } else {
              // reset streak to 1
              updateUserData({
                ...userProfileData,
                daily_streak: 1,
                last_daily: Date.now()
              })
            }
          }
          setCompletedTraining(true);
        }

        return mutatedPuzzles
      }
    
      const saveDailyModules = async (mutatedPuzzles) => {
        // let userID = localStorage.getItem('userID');
        // // save daily puzzles to api here
        // let endpoint = `/users/${userID}/daily_puzzles`;
        // put(endpoint, mutatedPuzzles)
        // .catch(error => alert(error))
        updateDailyModules(mutatedPuzzles)
      }
    
    const SetAchievements = async (result) => {
        // let userID = localStorage.getItem('userID');
        // let endpoint = `/achievements/${userID}`;
        // let now = Date.now();
  
        // let achievement =  {
        //   inserted_at: now,
        //   category: 'high_score',
        //   value: result,
        //   theme: openingData.type_ref
        // }

        updateAchievements("high_score", result, 0, openingData.type_ref)
        .catch(error => alert(error))
    }
    
    const toggleFinished = async (result) => {
        await saveResults(result);
        if (isDaily) {
          let updatedDailyModules = await putDailyModules();
          await saveDailyModules(updatedDailyModules);
        }
        setScore(result);
        setIsFinished(true);
        setIsStarted(false);
        logEvent(analytics, 'opening_completed', {'user': userId, 'isDaily': isDaily});
    }

    return (
        <>
        {!isStarted && !isFinished && (
            <PreOpeningPage togglePrePuzzleCallback={togglePrePuzzleCallback} openingData={openingData}/>
        )}
        {isStarted && !isFinished && (
            <OpeningPage toggleFinished={toggleFinished} openingData={openingData} orientation={orientation}/>
        )}
        {isFinished && (
            <PostOpeningPage completedTraining={completedTraining} openingData={openingData} isDaily={isDaily} score={score} scoreData={scoreData}/>
        )}
        </>
    )
}