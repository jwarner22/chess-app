import React, {useEffect, useState} from 'react'
import PrePuzzleHeader from "./OpeningComponents/PrePuzzleHeader"
import {DailyPuzzleIcon} from "../DailyPuzzle/DailyPuzzleElements"
import { StartButton } from '../DailyPuzzle/ModalElements'
import {Modules} from '../PatternRecognition/CourseTiles/Data';
import puzzle from "../../../../Images/chessBoardHeader.png"
import { PreOpeningsIconWrapper,
PreOpeningPageContainer } from './PreOpeningsPageElements';
import PrePuzzleTile from './OpeningComponents/PrePuzzleTiles';
import useFetch from '../../../api/useFetch';
import {baseURL} from '../../../api/apiConfig';

const PreOpeningPage = (props) => {
    const img = Modules[3].img;
    const {openingData, togglePrePuzzleCallback} = props;
    const {get, post} = useFetch(baseURL);
    const [loaded, setLoaded] = useState(false);
    const [userOpeningData, setUserOpeningData] = useState({});

    function handleStartButtonClick() {
        togglePrePuzzleCallback()
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
                console.log(data);
            }

        } catch (error) {
            console.log(error);
        }
        setLoaded(true);
    }

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