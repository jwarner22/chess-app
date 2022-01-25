import React, { useEffect, useState, createContext, useContext, useReducer } from "react";
import Loader from './components/Loader.js';
import useFetch from './components/api/useFetch.js';
import { baseURL } from "./components/api/apiConfig.js";
import {AuthContext} from './components/Auth';

import {Modules} from './components/PostLogin/Views/PatternRecognition/CourseTiles/Data';

const UserContext = createContext();

// Actions
const INITIALIZE = 'INITIALIZE';

const mutatePicks = (picks) => { 
    let now = new Date();
    picks = Modules.filter(element => {
        return picks.some(entry => entry === element.id)
    })


    let mutatedPicks = picks.map(pick => {return {...pick, completed: false, locked: true, inserted_at: now.toString()}})
    mutatedPicks[0].locked = false; // unlcocks first puzzle

    console.log({picks: picks});
    // expiration date is tomorrow at 12:00:00
    let expiration_date = new Date();
    expiration_date.setHours(24,0,0,0);
    expiration_date.toString();

    let schemaPicks = mutatedPicks.map((pick, index) => {
        return {
        location: index,
        theme_id: pick.id,
        title: pick.type_ref,
        completed: pick.completed,
        locked: pick.locked,
        inserted_at: pick.inserted_at,
        expiration: expiration_date
      }
    })
    return schemaPicks;
}

// GLOBAL STATE REDUCER
const Reducer = async (state, action) => {
    // Fetch hook
    const {get, put, post} = useFetch(baseURL);

    // Endpoints
    const userEndpoint = `/users/${action.userId}`;
    const achievementsEndpoint = `/achievements/${action.userId}`;
    const themesEndpoint = `/users/${action.userId}/themes`;
    const dailyEndpoint =  `/users/${action.userId}/daily_modules`;
    const picksEndpoint = `/users/${action.userId}/daily_puzzles/picks`

    switch (action.type) {

        //Initial Global Data
        case 'INITIALIZE':
            // FETCH USER DATA
            console.log('fetching user data');
            let response = await get(userEndpoint);
            let userData = response;

            // FETCH ACHIEVEMENTS
            console.log('fetching achievement data');
            response = await get(achievementsEndpoint);
            let achievements = response;

            // FETCH THEMES
            console.log('fetching themes data');
            response = await get(themesEndpoint);
            let themes = response;
            
            // GET DAILY MODULES
            console.log('fetching daily modules data');
            let now = new Date();
    
            try {
                
                let response = await get(dailyEndpoint);
                let expiration = new Date(response.expiration);
                let dailyModules = response;

                if (response.detail === "daily puzzles not found") { // no daily modules

                    let picks = await get(picksEndpoint); // get picks
                    let schemaPicks = mutatePicks(picks); // map picks to modules and save
                    await post(`/users/${action.userId}/daily_puzzles`, schemaPicks); // post daily modules to db
                    
                    dailyModules = schemaPicks;
                    
                } else if (response.detail === "daily puzzles expired" | expiration < now) { // daily modules expired
                    let picks = await get(picksEndpoint); // get new picks
                    let schemaPicks = mutatePicks(picks); // map picks to modules and save
                    await put(`/users/${action.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
                    
                    dailyModules = schemaPicks;

                } 

                // return new state
                return {...state, userData: userData, achievements: achievements, themes: themes, dailyModules: dailyModules}

            } catch (e) {
                console.log(e)
            }
            break;
        
        // UPDATE USER DATA
        case 'UPDATE_USER':
            response = await put(userEndpoint, action.payload);
            
            return {...state, userData: response}
        
        // UPDATE THEME DATA
        case 'UPDATE_THEME':
            response = await put(themesEndpoint, action.payload);

            return {...state, themes: response}

        // ADD ACHIEVEMENT
        case 'ADD_ACHIEVEMENT':
            response = await post(achievementsEndpoint, action.payload)

            return {...state, achievements: [...state.achievements, response]}
        
        // UPDATE DAILY MODULES
        case 'UPDATE_DAILY':    
            let endpoint = `/users/${action.userId}/daily_puzzles`; 
            response = await put(endpoint, action.payload);
            
            return {...state, dailyModules: response}

        default:
            return null;
    }
}

let initialState = {userData: null, achievements: [], themes: [], dailyModules: []}
// USER CONTEXT
const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [themesData, setThemesData] = useState([]);
    const [dailyModules, setDailyModules] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const {get, put, post} = useFetch(baseURL);
    //const [themes, setThemes] = useState([]);
    const [state, dispatch] = useReducer(Reducer, initialState);

    const auth = useContext(AuthContext);

    // RUNS ON LOGIN
    useEffect(() => {
        //console.log(auth)
        //if (auth.currentUser && (auth.userId != null) && (isMounted === false)) {
            //console.log(auth.currentUser)
        // execute dispatch function with action = initialize
        //dispatch({type: INITIALIZE}, {userId: auth.userId})
    }, []);

    useEffect(() => {
        if (auth.currentUser) {
            setLoading(true);
            fetchUserData();
            fetchAchievements();
            fetchDailyModules();
            fetchThemesData();
            setIsMounted(true);
        }
        
    },[auth.userId, isMounted]);


    // USER DATA
    const fetchUserData = async () => {
        console.log('fetching user data');

        let endpoint = `/users/${auth.userId}`; 
        let response = await get(endpoint);

        setUserData(response);
        //setLoading(false)
    }

    const updateUserData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}`; 
        let response = await put(endpoint, data);

        setUserData(response);
        setLoading(() => false);
    }
    

    // THEME DATA
    const fetchThemesData = async () => {
        console.log('fetching themes data');

        let endpoint = `/users/${auth.userId}/themes`;
        let response = await get(endpoint);

        setThemesData(response);
        setLoading(false);
    }

    const updateThemesData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}/themes`; 
        let response = await put(endpoint, data);

        setThemesData(response);
        setLoading(() => false);
    }


    // DAILY MODULES
    const fetchDailyModules = async () => { 
        console.log('fetching daily modules data');
        let now = new Date();
        let endpoint = `/users/${auth.userId}/daily_modules`;

        try {
            
            let response = await get(endpoint);
            let expiration = new Date(response.expiration);
            console.log({response: response});
            if (response.detail === "daily puzzles not found") { // no daily modules
                // get picks
                let endpoint = `/users/${auth.userId}/daily_puzzles/picks`;
                let picks = await get(endpoint);
                // map picks to modules and save
                let schemaPicks = mutatePicks(picks);
                // post daily modules to db
                await post(`/users/${auth.userId}/daily_puzzles`, schemaPicks);
                // set daily modules
                setDailyModules(schemaPicks);
            } else if (response.detail === "daily puzzles expired") { // daily modules expired
                // get new picks
                let endpoint = `/users/${auth.userId}/daily_puzzles/picks`;
                let picks = await get(endpoint);
                // map picks to modules and save
                let schemaPicks = mutatePicks(picks);
                // update daily modules in db
                await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks);
                setDailyModules(schemaPicks);
            } else if (expiration < now) {
                  // get new picks
                let endpoint = `/users/${auth.userId}/daily_puzzles/picks`;
                let picks = await get(endpoint);
                // map picks to modules and save
                let schemaPicks = mutatePicks(picks);
                // update daily modules in db
                await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks);
                setDailyModules(schemaPicks);
            
            } else {
                setDailyModules(response);
            }

        } catch (e) { 
            console.log(e);
        }
        setLoading(false);
    }

    const mutatePicks = (picks) => { 
        let now = new Date();
        picks = Modules.filter(element => {
            return picks.some(entry => entry === element.id)
        })


        let mutatedPicks = picks.map(pick => {return {...pick, completed: false, locked: true, inserted_at: now.toString()}})
        mutatedPicks[0].locked = false; // unlcocks first puzzle

        console.log({picks: picks});
        // expiration date is tomorrow at 12:00:00
        let expiration_date = new Date();
        expiration_date.setHours(24,0,0,0);
        expiration_date.toString();

        let schemaPicks = mutatedPicks.map((pick, index) => {
            return {
            location: index,
            theme_id: pick.id,
            title: pick.type_ref,
            completed: pick.completed,
            locked: pick.locked,
            inserted_at: pick.inserted_at,
            expiration: expiration_date
          }
        })
        return schemaPicks;
    }

    const updateDailyModules = async (data) => { 
        setLoading(() => true);
        
        let endpoint = `/users/${auth.userId}/daily_puzzles`; 
        let response = await put(endpoint, data);

        setDailyModules(response);
        setLoading(() => false);
    }

    // ACHIEVEMENTS
    const fetchAchievements = async () => {
        console.log('fetching achievement data');
        //setLoading(prev => !prev);

        let endpoint = `/achievements/${auth.userId}`; 
        let response = await get(endpoint);

        setAchievements(response);
        //setLoading(false);
    }

    const updateAchievements = async (category, value, diff, theme) => { 
        setLoading(() => true);
        let now = Date.now();
        let payload = {
            inserted_at: now,
            category: category,
            diff: diff,
            value: value,
            theme: theme
        }

        // need to post new achievement and update achievement list
        let endpoint = `/achievements/${auth.userId}`; 
        let response = await post(endpoint, payload);

        setAchievements(current => [...current, response]);
        setLoading(() => false);
    }

    // if (loading) { 
    //    return <Loader />
    //  }
    return (
      <UserContext.Provider value={{userData, updateUserData, achievements, updateAchievements, themesData, updateThemesData, dailyModules, updateDailyModules}}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export {UserContext, UserProvider}