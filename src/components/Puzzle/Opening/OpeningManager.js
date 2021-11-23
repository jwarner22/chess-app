import {useState} from 'react'

import PostOpeningPage from '../../PostLogin/Views/Openings/PostOpeningPage';
import PreOpeningPage from '../../PostLogin/Views/Openings/PreOpeningPage';
import OpeningPage from '../Opening.js'


// need to add to opening route and clean up props for child components and this componen
export default function OpeningManager(props) {
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [score, setScore] = useState(0);
    const openingsData = props.location.state.module;
    console.log({openingsData: openingsData})
    const togglePrePuzzleCallback = () => {
        setIsFinished(false);
        setIsStarted(true);
    }

    const toggleFinished = (result) => {
        setIsFinished(true);
        setIsStarted(false);
        setScore(result);
        // need to save results to db (score and completed (+1))
    }

    return (
        <>
        {!isStarted && !isFinished && (
            <PreOpeningPage togglePrePuzzleCallback={togglePrePuzzleCallback} openingsData={openingsData}/>
        )}
        {isStarted && !isFinished && (
            <OpeningPage toggleFinished={toggleFinished} openingsData={openingsData}/>
        )}
        {isFinished && (
            <PostOpeningPage openingsData={openingsData} isDaily={false} score={score}/>
        )}
        </>
    )
}