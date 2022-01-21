import React, { useEffect, useState, createContext, useContext } from "react";
import Loader from './components/Loader.js';
import useFetch from './components/api/useFetch.js';
import { baseURL } from "./components/api/apiConfig.js";
import {AuthContext} from './components/Auth';

import {Modules} from './components/PostLogin/Views/PatternRecognition/CourseTiles/Data';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [themesData, setThemesData] = useState([]);
    const [dailyModules, setDailyModules] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const {get, put, post} = useFetch(baseURL);
    const auth = useContext(AuthContext);

    // RUNS ON LOGIN
    useEffect(() => {
        console.log(auth)
        if (auth.currentUser && (auth.userId != null) && (isMounted === false)) {
            console.log(auth.currentUser)
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