import React, {useEffect, useState, useContext} from 'react'
import { withRouter } from 'react-router-dom';
import InfoBox from "../../../UI_Kit/InfoBox/InfoBox";
import {PageContainer} from "../../../UI_Kit/Page";

import {UserContext} from '../../../../providers/GlobalState'; // context
import { BackButtonWrapper } from '../../../Module/Utilities/Progress';
import BackButton from '../../../BackButton';
//import books svg from Images
const img =  require('../../../../Images/Books.svg').default

const PreOpeningPage = (props) => {
    const currentOpening = props.location.state.currentOpening;
    const [loaded, setLoaded] = useState(false);
    const {openings, contextLoading, userData} = useContext(UserContext);
    console.log(props)
    function handleStartButtonClick(color) {
        // add link instead of callback
        props.history.push({pathname:`/opening/${currentOpening.uci}/${color}`, state: {currentOpening: currentOpening, isDaily: props.location.state.isDaily}});
    }

    useEffect(() => {
        if (currentOpening == null) return;
        let opening = openings.find(opening => opening.opening_id === currentOpening.opening_id);
        if (opening == null) {
            opening = {
                opening_id: currentOpening.opening_id,
                completed: 0,
                high_score: 0,
                opening_name: currentOpening.headline,
                score_history:'0,0,0,0,0,0,0'
        }
    }
        //setUsercurrentOpening(opening);
        setLoaded(true);
    },[currentOpening])

    if (loaded && !contextLoading) {
    return (
        <PageContainer>
            <BackButtonWrapper>
                <BackButton />
            </BackButtonWrapper>
            <InfoBox 
                category={'opening'}
                title={currentOpening.name} 
                subtitle={currentOpening.pgn} 
                image={img}
                headlineOne={"Opening Mastery"}
                headlineTwo={"Repetitions"}
                userData={userData}
                dataOne={currentOpening.history_7}
                dataTwo={currentOpening.completions*3}
                onStartClick={handleStartButtonClick}
                buttonOneTitle={"Play as White"}
                buttonTwoTitle={"Play as Black"}/> 
            {/* <PrePuzzleTile currentOpening={currentOpening} onStartClick={handleStartButtonClick} usercurrentOpening={usercurrentOpening}/> */}
        </PageContainer>
    )} else {
        return null;
    }
}

export default withRouter(PreOpeningPage);