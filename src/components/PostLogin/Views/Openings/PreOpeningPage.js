import React, {useEffect, useState, useContext} from 'react'
import PrePuzzleHeader from "./OpeningComponents/PrePuzzleHeader"
import {PreOpeningPageContainer } from './PreOpeningsPageElements';
import PrePuzzleTile from './OpeningComponents/PrePuzzleTiles';
import InfoBox from "../../../UI_Kit/InfoBox/InfoBox";
import {PageContainer} from "../../../UI_Kit/Page";

import {UserContext} from '../../../../providers/GlobalState'; // context
import { BackButtonWrapper } from '../../../Module/Utilities/Progress';
import BackButton from '../../../BackButton';

const PreOpeningPage = (props) => {
    const {openingData, togglePrePuzzleCallback} = props;
    const [loaded, setLoaded] = useState(false);
    const [userOpeningData, setUserOpeningData] = useState({});

    const {openings, updateOpenings, contextLoading} = useContext(UserContext);

    function handleStartButtonClick(color) {
        togglePrePuzzleCallback(color)
    }

    useEffect(() => {
        let opening = openings.find(opening => opening.opening_id === openingData.id);
        if (opening == null) {
            opening = {
                opening_id: openingData.id,
                completed: 0,
                high_score: 0,
                opening_name: openingData.headline,
                score_history:'0,0,0,0,0,0,0'
        }
        updateOpenings(openingData.id, opening);
    }
        setUserOpeningData(opening);
        setLoaded(true);
    },[])

    if (loaded && !contextLoading) {
    return (
        <PageContainer>
            <BackButtonWrapper>
                <BackButton />
            </BackButtonWrapper>
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