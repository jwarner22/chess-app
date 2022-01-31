import React, {useEffect, useState, useContext} from 'react'
import PrePuzzleHeader from "./OpeningComponents/PrePuzzleHeader"
import {PreOpeningPageContainer } from './PreOpeningsPageElements';
import PrePuzzleTile from './OpeningComponents/PrePuzzleTiles';

import {UserContext} from '../../../../GlobalState'; // context

const PreOpeningPage = (props) => {
    const {openingData, togglePrePuzzleCallback} = props;
    const [loaded, setLoaded] = useState(false);
    const [userOpeningData, setUserOpeningData] = useState({});

    const {openings} = useContext(UserContext);

    function handleStartButtonClick(color) {
        togglePrePuzzleCallback(color)
    }

    useEffect(() => {
        let opening = openings.find(opening => parseInt(opening.opening_id) === openingData.id);
        setUserOpeningData(opening);
        setLoaded(true);
    },[])

    if (loaded) {
    return (
        <PreOpeningPageContainer>
            <PrePuzzleHeader />
            <PrePuzzleTile openingData={openingData} onStartClick={handleStartButtonClick} userOpeningData={userOpeningData}/>
        </PreOpeningPageContainer>
    )} else {
        return null;
    }
}

export default PreOpeningPage