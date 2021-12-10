import {useState} from 'react'

import PostOpeningPage from '../../PostLogin/Views/Openings/PostOpeningPage';
import PreOpeningPage from '../../PostLogin/Views/Openings/PreOpeningPage';
import OpeningPage from '../Opening.js'
import useFetch from '../../api/useFetch';
import {baseURL} from '../../api/apiConfig';

// need to add to opening route and clean up props for child components and this componen
export default function OpeningManager(props) {
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreData, setScoreData] = useState([]);
    const {put} = useFetch(baseURL);
    const openingData = props.location.state.module;
    const schemaPicks = props.location.state.schemaPicks;
    const isDaily = props.location.state.isDaily;
    
    const togglePrePuzzleCallback = () => {
        setIsFinished(false);
        setIsStarted(true);
    }

    const saveResults = async (result) => {
        const userId = localStorage.getItem('userID')
        const openingId = openingData.id;
        const userOpeningData = JSON.parse(sessionStorage.getItem('userOpeningData'));
        
        let completed = userOpeningData.completed + 1;
        let highScore = (result > userOpeningData.high_score) ? result : userOpeningData.high_score;
       
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
        
        console.log({schemaPicks: schemaPicks})

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

        return mutatedPuzzles
      }
    
      const saveDailyModules = async (mutatedPuzzles) => {
        let userID = localStorage.getItem('userID');
        // save daily puzzles to api here
        let endpoint = `/users/${userID}/daily_puzzles`;
        put(endpoint, mutatedPuzzles)
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