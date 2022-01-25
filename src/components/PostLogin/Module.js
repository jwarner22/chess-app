import React, {useEffect, useState, useContext} from 'react';

// custom fetch hook
import useFetch from '../api/useFetch.js';
import {baseURL} from '../api/apiConfig';

// components
import Loader from '../Loader.js';
import ModuleManager from '../Puzzle/ModuleManager.js';
import PrePuzzle from '../PrePuzzle/PrePuzzle.js';

// context
import {UserContext} from '../../GlobalState'
import { Cpanel } from 'styled-icons/fa-brands';

export default function Module(props) {
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);
    const [prePuzzleToggle,setPrePuzzleToggle] = useState(true);
    const [highScore, setHighScore] = useState(0);

    const {userData} = useContext(UserContext);

    const userId = userData.user_id;

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

    // const theme = props.location.state.module.type_ref;
    // const category = props.location.state.module.category;
    // const id = props.location.state.module.id;
    const isDaily = props.location.state.isDaily;
    const location = props.location.state.location;

    console.log({moduleData: moduleData})
    //load user data
    useEffect(() => {
        getModule();
    },[])

    useEffect(() => {
        getModule();
    },[moduleData.theme])

    const getModule = () => {
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
        
        // gets initial rating for user
        let initialRating = await get(`/users/${userId}/initial-rating`)        
        
        post(`/users/${userId}/themes`,{
                title: moduleData.theme,
                category: moduleData.category,
                rating: moduleData.initialRating[0],
                completed: 0,
                high_score: 0,
                score_history: '0,0,0,0,0,0,0'
                }).then(data => {
                    setRating(data.rating)
                }).catch(e => console.log(e))
    }

    const togglePrePuzzle = () => {
        setPrePuzzleToggle(prevPrePuzzle => !prevPrePuzzle)
    }
    
    const onSwapModule = () => {
        // change to alt module (daily only)
        console.log('swapped module');
        
        if (!moduleData.alt) {
            setModuleData(prev => {return {...prev, theme: altData.theme,id: altData.id, alt:true}})
        } else { 
            setModuleData({...primaryData})
        }
    }

    if (loading) {
        return <Loader />
    }  else if (prePuzzleToggle) {
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