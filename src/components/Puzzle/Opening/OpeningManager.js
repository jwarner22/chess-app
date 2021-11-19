import {useState} from 'react'

import PostOpeningPage from '../../PostLogin/Views/Openings/PostOpeningPage';
import PreOpeningPage from '../../PostLogin/Views/Openings/PreOpeningPage';
import OpeningPage from '../Opening.js'


// need to add to opening route and clean up props for child components and this componen
export default function OpeningManager(props) {
    const [isFinished, setIsFinished] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const openingsData = props.location.state.module;
    console.log({openingsData: openingsData})
    const togglePrePuzzleCallback = () => {
        setIsFinished(false);
        setIsStarted(true);
    }

    const toggleFinished = () => {
        setIsFinished(true);
        setIsStarted(false);
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
            <PostOpeningPage openingsData={openingsData} isDaily={false}/>
        )}
        </>
    )
}