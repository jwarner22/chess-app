import React, {useEffect, useState} from 'react';

// custom fetch hook
import useFetch from '../api/useFetch.js';
import {baseURL} from '../api/apiConfig';

// components
import Loader from '../Loader.js';
import ModuleManager from '../Puzzle/ModuleManager.js';
import PrePuzzle from '../PrePuzzle/PrePuzzle.js';

export default function Module(props) {
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);
    const [prePuzzleToggle,setPrePuzzleToggle] = useState(true);
    const [highScore, setHighScore] = useState(0);

    const {get,post} = useFetch(baseURL);

    const theme = props.location.state.module.type_ref;
    const category = props.location.state.module.category;
    const id = props.location.state.module.id;
    const isDaily = props.location.state.isDaily;
    const schemaPicks = props.location.state.schemaPicks;

    const userID = localStorage.getItem('userID');

    //load user data
    useEffect(() => {
        getModule()
    },[])

    const getModule = () => {
        get(`/users/${userID}/themes/${theme}`)
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
        let initialRating = await get(`/users/${userID}/initial-rating`)        
        
        post(`/users/${userID}/themes`,{
                title: theme,
                category: category,
                rating: initialRating[0],
                completed: 0,
                high_score: 0,
                score_history: '0,0,0,0,0,0,0'
                }).then(data => {
                    setRating(data.rating)
                }).then(() => {
                     get(`/users/${userID}`).then(data => {
                            localStorage.setItem('userPublicData', JSON.stringify(data))
                })
                    })
                    .catch(e => console.log(e))
    }

    const togglePrePuzzle = () => {
        setPrePuzzleToggle(prevPrePuzzle => !prevPrePuzzle)
    }

    if (loading) {
        return <Loader />
    }  else if (prePuzzleToggle) {
        return(
            <PrePuzzle togglePrePuzzleCallback={togglePrePuzzle} moduleId={id} rating={rating} highScore={highScore}/>
        )
    }

    return(
        <>
        <ModuleManager rating={rating} theme = {theme} id={id} isDaily={isDaily} schemaPicks={schemaPicks}/>
        </>
    )
}