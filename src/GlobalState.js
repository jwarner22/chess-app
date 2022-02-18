import React, { useEffect, useState, createContext, useContext, useReducer } from "react";
import useFetch from './components/api/useFetch.js';
import { baseURL } from "./components/api/apiConfig.js";
import {AuthContext} from './components/Auth';

import {Modules} from './components/PostLogin/Views/PatternRecognition/CourseTiles/Data';
import { ThermometerSun } from "styled-icons/bootstrap";

const UserContext = createContext();

// USER CONTEXT
const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [themesData, setThemesData] = useState([]);
    const [dailyModules, setDailyModules] = useState([]);
    const [userId, setUserId] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [openings, setOpenings] = useState([]);
    const {get, put, post} = useFetch(baseURL);

    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.currentUser) {
            updateGlobalState();
            setIsMounted(true);
        }
    },[auth.userId]);

    const updateGlobalState = async () => {
        setLoading(true);
        await fetchAllUserData();
        await fetchAchievements();
    }

    const getUserPreferrenceEmbedding = (themes, openings) => {
        // create embedding vector from nb_plays entry of each theme

        let embedding = Modules.map(module => {
            let output = {}
            if (module.category === 'opening') {
                output = openings.find(theme => theme.opening_id === module.id);
            } else { 
                output = themes.find(theme => theme.title === module.type_ref);
            }
            if (output == null) return {id: module.id, completed: 0}
            return {id: module.id, completed: output.completed};
        })

        let preference_embedding = embedding.map((item, index) => {
            
            return item.completed;
        })
        
        let total_plays = preference_embedding.reduce((prev, curr) => prev + curr);
        if (total_plays === 0) { // if no plays, set all to default prob
            let default_prob = 1/preference_embedding.length
            return embedding.map((module) => {
                return {id: module.id, prob: default_prob};
            });
        }

        let baseline_prob = 1/preference_embedding.length;
        preference_embedding = preference_embedding.map(item => (item/total_plays));
        preference_embedding = preference_embedding.map(item => (baseline_prob+item));
        
        let total_avgd = preference_embedding.reduce((prev,curr) => prev+curr);
        preference_embedding = preference_embedding.map(item => (item/total_avgd));
        
        embedding = embedding.map((item, index) => {
            return {id: item.id, prob: preference_embedding[index]}
        })

        return embedding;
    }

    // USER DATA
    const fetchAllUserData = async () => {
        console.log('big fetch request -> should only see this on start up');

        let endpoint = `/users/${auth.userId}/all`;
        let response = await get(endpoint);
        console.log({response:response});
        let user =  {...response};
        console.log({user:user})

        delete user.themes;
        delete user.openings;
        delete user.daily_puzzles;
        delete user.id;

        let embedding = getUserPreferrenceEmbedding(response.themes, response.openings)

        setUserId(auth.userId);

        // reset daily streak if it's been more than a day
        let yesterday = new Date((new Date().valueOf() - (24 * 60 * 60 * 1000))).getDate();
        let today = new Date().getDate();
        let lastDaily = new Date(user.last_daily);
        console.log({lastDaily: lastDaily.getDate(), today: today, yesterday: yesterday});
        if (lastDaily.getDate() !== (yesterday) && lastDaily.getDate() !== today) {
            user.daily_streak = 0;
            updateUserData(user);
        } else {
            setUserData(user);
        }

        setThemesData(response.themes);
        setOpenings(response.openings);
        handleDailyModules(response.daily_puzzles, embedding);
    }

    const updateUserData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}`; 
        let response = await put(endpoint, data);
        setUserData(response);
        setLoading(() => false);
    }
    
    // THEME DATA
    const updateThemesData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}/themes`; 
        let response = await put(endpoint, data);

        let newThemes = [...themesData];
        newThemes = newThemes.map(theme => {
            if (response.title === theme.title) return response;
            return theme;
        });

        setThemesData(newThemes);
        setLoading(() => false);
    }

    // DAILY MODULES
    const handleDailyModules = async (response, embedding) => {

        let now = new Date();
        if (response.length === 0) { // no daily modules
            let endpoint = `/users/${auth.userId}/daily_puzzles/picks`;
            let {picks, alts} = await put(endpoint, embedding); // get picks
            let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
            await post(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // post daily modules to db
            setDailyModules(schemaPicks); // set daily modules
            setLoading(false);

        } else if (response.detail === "daily puzzles expired") { // daily modules expired
            let endpoint = `/users/${auth.userId}/daily_puzzles/picks`; // get new picks
            let {picks, alts} = await put(endpoint, embedding); // get picks
            let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
            await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
            setDailyModules(schemaPicks);
            setLoading(false);

        } else if ((new Date(response[0].expiration)) < now) {
            let endpoint = `/users/${auth.userId}/daily_puzzles/picks`; // get new picks
            let {picks, alts} = await put(endpoint, embedding);
            let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
            await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
            setDailyModules(schemaPicks);
            setLoading(false);

        } else {
            setDailyModules(response);
            setLoading(false);
        }

    }

 
    const mutatePicks = (picks, alts) => { 
        let now = new Date();

        let selections = Modules.filter(element => {
            return picks.some(entry => entry === element.id)
        })

        let alt_selections = alts.map(element => {
            return Modules.find(entry => entry.id === element)
        })

        selections = selections.map((pick, index) => {
            if (index < alt_selections.length) {
            return {...pick, completed: false, locked: true, inserted_at: now.toString(), alt_id: alts[index], alt_title: alt_selections[index].type_ref}
            } else {
                return {...pick, completed: false, locked: true, inserted_at: now.toString(), alt_id: null, alt_title: null}
            }
        })
        selections[0].locked = false; // unlcocks first puzzle

        // expiration date is tomorrow at 12:00:00
        let expiration_date = new Date();
        expiration_date.setHours(24,0,0,0);
        expiration_date.toString();

        let schemaPicks = selections.map((pick, index) => {
            return {
            location: index,
            theme_id: pick.id,
            title: pick.type_ref,
            completed: pick.completed,
            locked: pick.locked,
            inserted_at: pick.inserted_at,
            expiration: expiration_date,
            alt_id: pick.alt_id,
            alt_title: pick.alt_title
        }})
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

        let endpoint = `/achievements/${auth.userId}`; 
        let response = await get(endpoint);
        if (response.length === 0) { // no achievements
            setAchievements([]);
        } else {
            setAchievements(response);
        }
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

    // OPENINGS
    const updateOpenings = async (openingId, data) => {
        setLoading(() => true);
        console.log({openings: openings, openingId: openingId, data:data});
        // check if opening is already in openings array
        if (openings.some(opening => opening.opening_id === openingId)) {
            let endpoint = `/openings/${auth.userId}/${openingId}`; 
            let response = await put(endpoint, data);
            setOpenings(current => current.map(opening => {
                if (opening.opening_id === openingId) return response;
                return opening;
            }));
        } else {
            // if opening is not in openings array, post new opening
            let endpoint = `/openings/${auth.userId}/${openingId}`;
            let response = await post(endpoint, data);
            setOpenings(current => [...current, response]);
        }


        // let response = await put(`/openings/${auth.userId}/${openingId}`, data);
        
        // let newOpenings = [...openings];
        // newOpenings = openings.map(opening => {
        //     if (opening.opening_id === response.opening_id) return response;
        //     return opening;
        // // });
        
        // setOpenings(newOpenings);
        setLoading(() => false);
    }

    return (
      <UserContext.Provider value={{updateGlobalState, userId, contextLoading: loading, userData, updateUserData, achievements, updateAchievements, openings, updateOpenings, themesData, updateThemesData, dailyModules, updateDailyModules}}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export {UserContext, UserProvider}



   // const fetchDailyModules = async () => { 
    //     console.log('fetching daily modules data');
    //     let now = new Date();
    //     let endpoint = `/users/${auth.userId}/daily_modules`;

    //     try {
            
    //         let response = await get(endpoint);

    //         if (response.detail === "daily puzzles not found") { // no daily modules
    //             // get picks
    //             let endpoint = `/users/${auth.userId}/daily_puzzles/picks`;
    //             let {picks, alts} = await get(endpoint); // get picks
    //             let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
    //             await post(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // post daily modules to db
    //             setDailyModules(schemaPicks); // set daily modules
    //         } else if (response.detail === "daily puzzles expired") { // daily modules expired
    //             let endpoint = `/users/${auth.userId}/daily_puzzles/picks`; // get new picks
    //             let {picks, alts} = await get(endpoint); // get picks
    //             let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
    //             await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
    //             setDailyModules(schemaPicks);
    //         } else if ((new Date(response[0].expiration)) < now) {
    //             let endpoint = `/users/${auth.userId}/daily_puzzles/picks`; // get new picks
    //             let {picks, alts} = await get(endpoint);
    //             let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
    //             await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
    //             setDailyModules(schemaPicks);
    //         } else {
    //             setDailyModules(response);
    //             console.log(response);
    //         }

    //     } catch (e) { 
    //         console.log(e);
    //     } finally {
    //         console.log('no longer loading')
    //         setLoading(() => false);
    //     }
    // }


    // const fetchUserData = async () => {
    //     console.log('fetching user data');

    //     let endpoint = `/users/${auth.userId}`; 
    //     let response = await get(endpoint);

    //     setUserData(response);
    //     //setLoading(false)
    // }

    // const fetchThemesData = async () => {
    //     console.log('fetching themes data');

    //     let endpoint = `/users/${auth.userId}/themes`;
    //     let response = await get(endpoint);

    //     setThemesData(response);
    //     setLoading(false);
    // }

  // GLOBAL STATE REDUCER
// const Reducer = async (state, action) => {
//     // Fetch hook
//     const {get, put, post} = useFetch(baseURL);

//     // Endpoints
//     const userEndpoint = `/users/${action.userId}`;
//     const achievementsEndpoint = `/achievements/${action.userId}`;
//     const themesEndpoint = `/users/${action.userId}/themes`;
//     const dailyEndpoint =  `/users/${action.userId}/daily_modules`;
//     const picksEndpoint = `/users/${action.userId}/daily_puzzles/picks`

//     switch (action.type) {

//         //Initial Global Data
//         case 'INITIALIZE':
//             // FETCH USER DATA
//             console.log('fetching user data');
//             let response = await get(userEndpoint);
//             let userData = response;

//             // FETCH ACHIEVEMENTS
//             console.log('fetching achievement data');
//             response = await get(achievementsEndpoint);
//             let achievements = response;

//             // FETCH THEMES
//             console.log('fetching themes data');
//             response = await get(themesEndpoint);
//             let themes = response;
            
//             // GET DAILY MODULES
//             console.log('fetching daily modules data');
//             let now = new Date();
    
//             try {
                
//                 let response = await get(dailyEndpoint);
//                 let expiration = new Date(response.expiration);
//                 let dailyModules = response;

//                 if (response.detail === "daily puzzles not found") { // no daily modules

//                     let picks = await get(picksEndpoint); // get picks
//                     let schemaPicks = mutatePicks(picks); // map picks to modules and save
//                     await post(`/users/${action.userId}/daily_puzzles`, schemaPicks); // post daily modules to db
                    
//                     dailyModules = schemaPicks;
                    
//                 } else if (response.detail === "daily puzzles expired" | expiration < now) { // daily modules expired
//                     let picks = await get(picksEndpoint); // get new picks
//                     let schemaPicks = mutatePicks(picks); // map picks to modules and save
//                     await put(`/users/${action.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
                    
//                     dailyModules = schemaPicks;

//                 } 

//                 // return new state
//                 return {...state, userData: userData, achievements: achievements, themes: themes, dailyModules: dailyModules}

//             } catch (e) {
//                 console.log(e)
//             }
//             break;
        
//         // UPDATE USER DATA
//         case 'UPDATE_USER':
//             response = await put(userEndpoint, action.payload);
            
//             return {...state, userData: response}
        
//         // UPDATE THEME DATA
//         case 'UPDATE_THEME':
//             response = await put(themesEndpoint, action.payload);

//             return {...state, themes: response}

//         // ADD ACHIEVEMENT
//         case 'ADD_ACHIEVEMENT':
//             response = await post(achievementsEndpoint, action.payload)

//             return {...state, achievements: [...state.achievements, response]}
        
//         // UPDATE DAILY MODULES
//         case 'UPDATE_DAILY':    
//             let endpoint = `/users/${action.userId}/daily_puzzles`; 
//             response = await put(endpoint, action.payload);
            
//             return {...state, dailyModules: response}

//         default:
//             return null;
//     }
// }

// Actions
// const INITIALIZE = 'INITIALIZE';

// const mutatePicks = (picks) => { 
//     let now = new Date();
//     picks = Modules.filter(element => {
//         return picks.some(entry => entry === element.id)
//     })


//     let mutatedPicks = picks.map(pick => {return {...pick, completed: false, locked: true, inserted_at: now.toString()}})
//     mutatedPicks[0].locked = false; // unlcocks first puzzle

//     console.log({picks: picks});
//     // expiration date is tomorrow at 12:00:00
//     let expiration_date = new Date();
//     expiration_date.setHours(24,0,0,0);
//     expiration_date.toString();

//     let schemaPicks = mutatedPicks.map((pick, index) => {
//         return {
//         location: index,
//         theme_id: pick.id,
//         title: pick.type_ref,
//         completed: pick.completed,
//         locked: pick.locked,
//         inserted_at: pick.inserted_at,
//         expiration: expiration_date
//       }
//     })
//     return schemaPicks;
// }

