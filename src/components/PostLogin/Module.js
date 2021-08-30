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
    const {get,post} = useFetch(baseURL);
    const theme = props.location.state.module.type_ref;
    const category = props.location.state.module.category;
    const id = props.location.state.module.id;
    
    //load user data
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userPublicData'));
        let themeRecord = data.themes.find(element=> element.title === theme)
        
        if (typeof themeRecord !== 'undefined') {
            setRating(() => themeRecord.rating)
            setLoading(prev => !prev)
        } else {
            //const API = new FetchWrapper(baseURL)
            let userID = localStorage.getItem('userID');
            post(`/users/${userID}/themes/`,{
                title: theme,
                category: category,
                rating: 1200,
                completed: 0,
                high_score: 0
            }).then(data => {
                setRating(data.rating)
            }).then(() => {
                get(`/users/${userID}`).then(data => {
                    localStorage.setItem('userPublicData', JSON.stringify(data))
                })
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
        }
    },[])

    const togglePrePuzzle = () => {
        setPrePuzzleToggle(prevPrePuzzle => !prevPrePuzzle)
    }
    console.log({rating:rating})
    if (loading) {
        return <Loader />
    }  else if (prePuzzleToggle) {
        return(
            <PrePuzzle togglePrePuzzleCallback={togglePrePuzzle} moduleId={id} rating={rating} />
        )
    }

    return(
        <>
        <Puzzle rating={rating} theme = {theme} id={id}/>
        </>
    )
}