import Puzzle from '../Puzzle/puzzle.js';
import React, {useEffect, useState} from 'react';
//import FetchWrapper from '../api/FetchWrapper.js';
import {baseURL} from '../api/apiConfig';
import useFetch from '../api/useFetch.js';
import Loader from '../../Preloader.js';
import PrePuzzle from '../PrePuzzle/PrePuzzle.js';

export default function Module(props) {
    //const text = props.location.state.text;
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
        //add if able to check for online status
        //let data = JSON.parse(localStorage.getItem('userPublicData'));
        //let themeRecord = data.themes.find(element=> element.title === theme)
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
        console.log({initialRating: initialRating})
        
        
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
        <Puzzle rating={rating} theme = {theme} id={id} isDaily={isDaily} schemaPicks={schemaPicks}/>
        </>
    )
}