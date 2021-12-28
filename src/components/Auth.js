import React, { useEffect, useState, createContext } from "react";
//import firebaseConfig from "../config.js";
//import {firebaseAPI} from '../config.js';
import firebase from 'firebase/compat/app';
import auth from "../config.js"
import Loader from '../components/Loader.js';

require('@firebase/auth')

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

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
      setCurrentUser(() => !!user);
      setLoading(false);
    });
  }, []);

   if (loading) {
     return <Loader />
   }
  return (
    <AuthContext.Provider value={{signup, login, logout, resetPassword, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider}