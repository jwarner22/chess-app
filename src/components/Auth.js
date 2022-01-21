import React, { useEffect, useState, createContext } from "react";
import firebase from 'firebase/compat/app';
import {firebaseApp} from "../config.js"
import Loader from '../components/Loader.js';
import {getAuth} from 'firebase/auth';

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
      setCurrentUser(() => !!user);
      setUserId(() => (user != null) ? user.uid : null);
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