import React, {useEffect, useState, useContext} from 'react'
import PrePuzzleHeader from "./OpeningComponents/PrePuzzleHeader"
import {PreOpeningPageContainer } from './PreOpeningsPageElements';
import PrePuzzleTile from './OpeningComponents/PrePuzzleTiles';
import InfoBox from "../../../UI_Kit/InfoBox/InfoBox";
import {PageContainer} from "../../../UI_Kit/Page";

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
        <PageContainer>
            <InfoBox 
                category={openingData.category}
                title={openingData.headline} 
                subtitle={openingData.subheading} 
                image={openingData.img}
                headlineOne={"Opening Mastery"}
                headlineTwo={"Completed Puzzles"}
                userData={userOpeningData}
                onStartClick={handleStartButtonClick}
                buttonOneTitle={"Play as White"}
                buttonTwoTitle={"Play as Black"}/> 
            {/* <PrePuzzleTile openingData={openingData} onStartClick={handleStartButtonClick} userOpeningData={userOpeningData}/> */}
        </PageContainer>
    )} else {
        return null;
    }
}

export default PreOpeningPage