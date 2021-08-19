import React, { useEffect, useState, createContext } from "react";
import firebaseConfig from "../config.js";
import {firebaseAPI} from '../config.js';
import auth from "../config.js"
require('@firebase/auth')

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
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
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log({authstatechanged: user.additionalUserInfo})// .profile.id})
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <AuthContext.Provider value={{signup, login, logout, resetPassword, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

