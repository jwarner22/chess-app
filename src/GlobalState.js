import React, { useEffect, useState, createContext, useContext, useReducer } from "react";
import Loader from './components/Loader.js';
import useFetch from './components/api/useFetch.js';
import { baseURL } from "./components/api/apiConfig.js";
import {AuthContext} from './components/Auth';

import {Modules} from './components/PostLogin/Views/PatternRecognition/CourseTiles/Data';

const UserContext = createContext();

// USER CONTEXT
const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
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
            setLoading(() => true);
            fetchAllUserData();
            //fetchUserData();
            fetchAchievements();
            //fetchDailyModules();
            //fetchThemesData();
            setIsMounted(true);
        }
        
    },[auth.userId]);

    // USER DATA

    const fetchAllUserData = async () => {
        console.log('big fetch request -> should only see this on start up');

        let endpoint = `/users/${auth.userId}/all`;
        let response = await get(endpoint);

        let user =  {...response};
        let excluded = ['themes', "openings", "daily_puzzles"];
        delete user[excluded];
        
        setUserId(auth.userId);
        setUserData(user);
        setThemesData(response.themes);
        setOpenings(response.openings);
        handleDailyModules(response.daily_puzzles)
    }

    // const fetchUserData = async () => {
    //     console.log('fetching user data');

    //     let endpoint = `/users/${auth.userId}`; 
    //     let response = await get(endpoint);

    //     setUserData(response);
    //     //setLoading(false)
    // }

    const updateUserData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}`; 
        let response = await put(endpoint, data);

        setUserData(response);
        setLoading(() => false);
    }
    

    // THEME DATA
    // const fetchThemesData = async () => {
    //     console.log('fetching themes data');

    //     let endpoint = `/users/${auth.userId}/themes`;
    //     let response = await get(endpoint);

    //     setThemesData(response);
    //     setLoading(false);
    // }

    const updateThemesData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}/themes`; 
        let response = await put(endpoint, data);

        setThemesData(response);
        setLoading(() => false);
    }


    // DAILY MODULES

    const handleDailyModules = async (response) => {
        console.log({response: response})
        let now = new Date();
        if (response.length === 0) { // no daily modules
            // get picks
            let endpoint = `/users/${auth.userId}/daily_puzzles/picks`;
            let {picks, alts} = await get(endpoint); // get picks
            let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
            await post(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // post daily modules to db
            setDailyModules(schemaPicks); // set daily modules
        } else if (response.detail === "daily puzzles expired") { // daily modules expired
            let endpoint = `/users/${auth.userId}/daily_puzzles/picks`; // get new picks
            let {picks, alts} = await get(endpoint); // get picks
            let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
            await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
            setDailyModules(schemaPicks);
        } else if ((new Date(response[0].expiration)) < now) {
            let endpoint = `/users/${auth.userId}/daily_puzzles/picks`; // get new picks
            let {picks, alts} = await get(endpoint);
            let schemaPicks = mutatePicks(picks, alts); // map picks to modules and save
            await put(`/users/${auth.userId}/daily_puzzles`, schemaPicks); // update daily modules in db
            setDailyModules(schemaPicks);
        } else {
            setDailyModules(response);
            console.log(response);
        }
    }

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

    const mutatePicks = (picks, alts) => { 
        let now = new Date();

        console.log({picks: picks, alts: alts});
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

        console.log({selection: selections});
        // expiration date is tomorrow at 12:00:00
        let expiration_date = new Date();
        expiration_date.setHours(24,0,0,0);
        expiration_date.toString();


        console.log({alt_selections: alt_selections});
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
        //setLoading(prev => !prev);

        let endpoint = `/achievements/${auth.userId}`; 
        let response = await get(endpoint);

        setAchievements(response);
        setLoading(false);
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
        let response = await put(`/openings/${auth.userId}/${openingId}`, data);
        setOpenings(response);
        setLoading(() => false);
    }


    return (
      <UserContext.Provider value={{contextLoading: loading, userData, updateUserData, achievements, updateAchievements, openings, updateOpenings, themesData, updateThemesData, dailyModules, updateDailyModules}}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export {UserContext, UserProvider}







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

