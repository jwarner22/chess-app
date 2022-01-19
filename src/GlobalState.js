import React, { useEffect, useState, createContext, useContext } from "react";
import Loader from './components/Loader.js';
import useFetch from './components/api/useFetch.js';
import { baseURL } from "./components/api/apiConfig.js";
import {AuthContext} from './components/Auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [themes, setThemes] = useState([]);
    const {get, put} = useFetch(baseURL);

    const auth = useContext(AuthContext);
  
    // const signup = (email, password) => {
    //       return	auth.createUserWithEmailAndPassword(email, password)
    //   }

    useEffect(() => {
        //fetchUserData();
    }, []);

    useEffect(() => {
        if (auth.currentUser) {
            setLoading(true);
            fetchUserData();
            fetchAchievements();
            fetchThemes();
        }
    },[auth]);

    const fetchUserData = async () => {
        console.log('fetching user data');

        let endpoint = `/users/${auth.userId}`; 
        let response = await get(endpoint);

        setUserData(response);
        //setLoading(false)
    }

    const fetchAchievements = async () => {
        console.log('fetching achievement data');
        //setLoading(prev => !prev);

        let endpoint = `/achievements/${auth.userId}`; 
        let response = await get(endpoint);

        setAchievements(response);
        //setLoading(false);
    }
    
    const fetchThemes = async () => {
        console.log('fetching themes data');

        let endpoint = `/users/${auth.userId}/themes`;
        let response = await get(endpoint);

        setThemes(response);
        setLoading(false);
    }

    const updateUserData = async (data) => { 
        setLoading(() => true);
        let endpoint = `/users/${auth.userId}`; 
        let response = await put(endpoint, data);

        setUserData(response);
        setLoading(() => false);
    }

    if (loading) {
       return <Loader />
     }
    return (
      <UserContext.Provider value={{userData, updateUserData, achievements, themes}}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export {UserContext, UserProvider}