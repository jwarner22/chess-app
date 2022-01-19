import React, { useEffect, useState, createContext } from "react";
//import firebaseConfig from "../config.js";
//import {firebaseAPI} from '../config.js';
import firebase from 'firebase/compat/app';
import {firebaseApp} from "../config.js"
import Loader from '../components/Loader.js';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { Cs } from "styled-icons/crypto";
import { setUserId } from "firebase/analytics";
//require('@firebase/auth')

const AuthContext = createContext();
const auth = getAuth(firebaseApp);


const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (email, password) => {
		return	auth.createUserWithEmailAndPassword(email, password)
	}

	const login = (email, password) => {
		return	auth.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return auth.signOut()
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log({user: user})
      setCurrentUser(() => !!user);
      setUserId(() => user.uid)
      setLoading(false);
    });
  }, []);

   if (loading) {
     return <Loader />
   }
  return (
    <AuthContext.Provider value={{signup, login, logout, resetPassword, currentUser, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider}