import Puzzle from '../Puzzle/puzzle.js';
import React, {useEffect, useState} from 'react';
import FetchWrapper from '../api/FetchWrapper.js';
import {baseURL} from '../api/apiConfig';

export default function Module(props) {
    //const text = props.location.state.text;
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);
    const theme = props.location.state.module.type_ref;
    const category = props.location.state.module.category;
    const id = props.location.state.module.id;
    
    //load user data
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userID'));
        console.log(data)
        let themeRecord = data.themes.find(element=> element.title === theme)
        console.log({oldrecord: themeRecord})
        if (typeof themeRecord !== 'undefined') {
            setRating(() => themeRecord.rating)
            setLoading(prev => !prev)
        } else {
            const API = new FetchWrapper(baseURL)
            console.log(theme)
            console.log(category)
            let userID = localStorage.getItem('userID');
            const endpoint = `/users/${userID}/themes/`
            API.post(endpoint,{
                title: theme,
                category: category,
                rating: 1200,
                completed: 0,
                high_score: 0
            }).then(data => {
                console.log(data)
                setRating(data.rating)
            }).then(() => {
                API.get(`/users/${userID}`).then(data => {
                    localStorage.setItem('userPublicData', JSON.stringify(data))
                })
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
        }
    },[])

    if (loading) {
        return <p>Loading...</p>
    }
    return(
        <>
        <Puzzle rating={rating} theme = {theme} id={id}/>
        </>
    )
}