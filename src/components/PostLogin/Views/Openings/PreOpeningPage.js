import React, {useEffect, useState} from 'react'
import PrePuzzleHeader from "./OpeningComponents/PrePuzzleHeader"
import { 
PreOpeningPageContainer } from './PreOpeningsPageElements';
import PrePuzzleTile from './OpeningComponents/PrePuzzleTiles';
import useFetch from '../../../api/useFetch';
import {baseURL} from '../../../api/apiConfig';
import { PageContainer } from '../../../UI_Kit/Page';
import InfoBox from '../../../UI_Kit/InfoBox/InfoBox';


const PreOpeningPage = (props) => {
    //const img = Modules[3].img;
    const {openingData, togglePrePuzzleCallback} = props;
    const {get, post} = useFetch(baseURL);
    const [loaded, setLoaded] = useState(false);
    const [userOpeningData, setUserOpeningData] = useState({});

    function handleStartButtonClick(color) {
        togglePrePuzzleCallback(color)
    }

    useEffect(() => {
        const userId = localStorage.getItem('userID')
        fetchUserOpeningData(userId);
    },[])

    const fetchUserOpeningData = async (userId) => {
        let openingId = openingData.id;
        try {
            const data = await get(`/openings/${userId}/${openingId}`);
            if (data.detail === 'opening not found') {
                const initialData = {
                    opening_id: openingId,
                    opening_name: openingData.headline,
                    owner_id: userId,
                    completed: 0,
                    high_score: 0,
                    score_history: '0,0,0,0,0,0,0'
                }
                await post(`/openings/${userId}/${openingId}`, initialData);
                sessionStorage.setItem('userOpeningData', JSON.stringify(initialData));
                setUserOpeningData(initialData);
            } else {
                setUserOpeningData(data);
                sessionStorage.setItem('userOpeningData', JSON.stringify(data));
            }

        } catch (error) {
            console.log(error);
        }
        setLoaded(true);
    }

    if (loaded) {
    return (
        <PageContainer>
            <InfoBox 
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