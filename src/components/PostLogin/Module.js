import React, {useEffect, useState, useContext} from 'react';

// custom fetch hook
import useFetch from '../api/useFetch.js';
import {baseURL} from '../api/apiConfig';

// components
import Loader from '../Loader.js';
import ModuleManager from '../Puzzle/ModuleManager.js';
import PrePuzzle from '../PrePuzzle/PrePuzzle.js';

// context
import {UserContext} from '../../GlobalState';

import usePrevious from "../Hooks/usePrevious";

export default function Module(props) {
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);
    const [prePuzzleToggle,setPrePuzzleToggle] = useState(true);
    const [highScore, setHighScore] = useState(0);

    const {userData, userId, contextLoading, themesData, updateThemesData} = useContext(UserContext);

    const primaryData = {
        theme: props.location.state.module.type_ref,
        category: props.location.state.module.category,
        id: props.location.state.module.theme_id,
        isDaily: props.location.state.isDaily,
        alt: false
    }
    const altData = {
        id: props.location.state.module.alt_id,
        theme: props.location.state.module.alt_title
    }

    const [moduleData, setModuleData] = useState({...primaryData});
    const {get,post} = useFetch(baseURL);

    const isDaily = props.location.state.isDaily;
    const location = props.location.state.location;

    const prevModuleData = usePrevious(moduleData);


    useEffect(() => {
        if (!contextLoading) {
            getModule();
        }
    },[contextLoading]) 

    useEffect(() => {
        if (prevModuleData == null) return;
        if (prevModuleData.theme !== moduleData.theme) {
            console.log('get module in module.js: this should not be happening rn')
            getModule();
        }
    },[moduleData.theme])

    const getModule = () => {
        let exists = themesData.some(theme => theme.title === moduleData.theme);
        if (exists) {
            let theme = themesData.find(theme => theme.title === moduleData.theme);
            setRating(theme.rating);
            setHighScore(theme.high_score);

            setLoading(false);
            return;
        }

        if (userId === '') return;
        console.log('actually fetched')
        get(`/users/${userId}/themes/${moduleData.theme}`)
        .then(data => {
            if (data.detail === "Theme not found") {
                createModule()
            } else {
                setRating(data.rating);
                setHighScore(data.high_score)
            }
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false))
    }

    const createModule = async () => {
        console.log({userData: userData})
        post(`/users/${userId}/themes`,{
                title: moduleData.theme,
                category: moduleData.category,
                rating: userData.initial_rating,
                completed: 0,
                high_score: 0,
                score_history: '0,0,0,0,0,0,0',
                }).then(data => {
                    setRating(data.rating)
                    updateThemesData(data)
                }).catch(e => console.log(e))
    
    }

    const togglePrePuzzle = () => {
        setPrePuzzleToggle(prevPrePuzzle => !prevPrePuzzle)
    }
    
    const onSwapModule = () => {
        // change to alt module (daily only)
        if (!moduleData.alt) {
            setModuleData(prev => {return {...prev, theme: altData.theme,id: altData.id, alt:true}})
        } else { 
            setModuleData({...primaryData})
        }
    }

    if (loading ) {
        return <Loader />
    }  
    
    if (prePuzzleToggle) {
        return(
            <PrePuzzle moduleData={moduleData} isDaily={isDaily} swapModule={onSwapModule} togglePrePuzzleCallback={togglePrePuzzle} rating={rating} highScore={highScore}/>
        )
    }

    return(
        <>
        <ModuleManager moduleData={moduleData} location={location} rating={rating} isDaily={isDaily} />
        </>
    )
}