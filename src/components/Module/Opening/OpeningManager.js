import {useState, useContext} from 'react'

//Erorr Boundary
import ErrorBoundary from '../../UI_Kit/ErrorBoundary.js';

import PostOpeningPage from '../../PostLogin/Views/Openings/PostOpeningPage';
import PreOpeningPage from '../../PostLogin/Views/Openings/PreOpeningPage';
import OpeningPage from './OpeningPage.js'
// import useFetch from '../../api/useFetch';
import ChessboardLoader from '../../ChessBoardLoader/ChessboardLoader.js';

// import {baseURL} from '../../api/apiConfig';
import {getAnalytics, logEvent} from "firebase/analytics";

// Global context
import {UserContext} from '../../../providers/GlobalState';


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
    const {contextLoading, userId, openings, updateOpenings, dailyModules, updateDailyModules, userData, updateUserData, updateAchievements} = useContext(UserContext)
    const analytics = getAnalytics();

    // from props
    const openingData = props.location.state.module;
    const location = props.location.state.location;
    const isDaily = props.location.state.isDaily;

    const togglePrePuzzleCallback = (color) => {
        setIsFinished(false);
        setIsStarted(true);
        setOrientation(color);
        logEvent(analytics, 'opening_started', {'user': userId, 'isDaily': isDaily});
    }

    const saveResults = async (result) => {
        const openingId = openingData.id;

        let userOpeningData = openings.find(opening => opening.opening_id === openingData.id)

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
    }

    // update daily module
    const putDailyModules = async () => {
        
      let mutatedPuzzles = [...dailyModules]

      mutatedPuzzles = mutatedPuzzles.map(module => {
        if (module.location === location) {
          module.completed = true;
        } else if (module.location === location + 1) { 
          module.locked = false;
        }
        return module;
      })

        // check for completed daily training
        if (mutatedPuzzles.every(puzzle => puzzle.completed === true)) {
          // record daily training completion => firebase
          logEvent(analytics, 'daily_training_completed', {'user': userId});

          let userProfileData = {...userData};
          let now = new Date();
          // if new user, set daily streak to 1
          if (userProfileData.last_daily == null) {
            updateUserData({              
              ...userProfileData,
              daily_streak: 1,
              last_daily: Date.now()
            })

          }

          let lastDaily = new Date(userProfileData.last_daily);
          // update user daily streak info
          if (lastDaily.getDate() !== now.getDate()) { // ensure no same day streak increase
            updateUserData({
              ...userProfileData,
              daily_streak: userProfileData.daily_streak + 1,
              last_daily: Date.now()
            })
            console.log('streak increased')
          }
          setCompletedTraining(true);
        }

        return mutatedPuzzles
      }
    
      const saveDailyModules = async (mutatedPuzzles) => {
        updateDailyModules(mutatedPuzzles)
      }
    
    const SetAchievements = async (result) => {
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

    if (contextLoading) {
        return <ChessboardLoader />
    }
  

    return (
        <>
        {!isStarted && !isFinished && (
          <ErrorBoundary>
            <PreOpeningPage togglePrePuzzleCallback={togglePrePuzzleCallback} openingData={openingData}/>
          </ErrorBoundary>
        )}
        {isStarted && !isFinished && (
          <ErrorBoundary>
            <OpeningPage toggleFinished={toggleFinished} openingData={openingData} orientation={orientation}/>
          </ErrorBoundary>
        )}
        {isFinished && (
          <ErrorBoundary>
            <PostOpeningPage completedTraining={completedTraining} openingData={openingData} isDaily={isDaily} score={score} scoreData={scoreData}/>
            </ErrorBoundary>
        )}
        </>
    )
}