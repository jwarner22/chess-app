
import React, {useState, useContext, useEffect, useRef } from "react";
import {Link, withRouter} from 'react-router-dom'
//import { AuthContext } from "../../index";
//import firebaseConfig from "../../config.js";
import styled from 'styled-components'
import logo from '../../Images/ChessReps Logo Horizontal White.png'
import headerImg from "../../Images/realChessHeader.jpg"
import {  
  Container, 
  FormWrap, 
  FormContent, 
  Form, 
  FormLabel, 
  FormInput, 
  FormText,
  GoogleButton,
  GoogleButtonText,
  LoginHeaderImg,
  ImgOverlay,
  LoginHeaderLogoWrapper,
  LoginHeaderLogo
} from './LoginElements';
import firebase from "firebase/compat/app";
import {AuthContext} from '../../providers/Auth.js';
import Button from "../UI_Kit/Button/Button";
import useFetch from "../../api/useFetch";
import {baseURL} from '../../api/apiConfig';
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import {getAnalytics, logEvent} from "firebase/analytics";

require("firebase/auth");



//history = push to dashboard
const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaved,setIsSaved] = useState(false)
  const {currentUser, resetPassword} = useContext(AuthContext)
  const {get, post} = useFetch(baseURL)
  const _isMounted = useRef(true)
  const analytics = getAnalytics();

  const emailRef = useRef();


  
  //const Auth = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && isLoggedIn && isSaved) {
      logEvent(analytics, "login", {'user': currentUser.uid});
      history.push({pathname: 'home/daily', state: {fromLogin: true}})
    }
  }, [currentUser, isLoggedIn, isSaved])

  useEffect(() =>  {
    return () => {
      _isMounted.current =  false;
    }
  },[])

  //login with email
  const handleForm = e => {
    e.preventDefault();
    
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
//if user is logged in, push to the app dashboard
          if (res.user) {
            //console.log(res)
            //Auth.setLoggedIn(true);
            setUserData(res, res.user.uid);
            setIsLoggedIn(true)
          } 
        })
        .catch(e => {
          setErrors(e.message);
        });
      })
  
  };
//Sign in with Google Popup
// needs to be set to local
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => { 
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        //Auth.setLoggedIn(true);
        if (res.user) {
          setUserData(res, res.user.uid);
          setIsLoggedIn(true)
        }
      })
      .catch(e => setErrors(e.message))
    })
  };

  //sign in with Apple
  const signInWithApple = () => {
    const provider = new firebase.auth.OAuthProvider("apple.com");
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => { 
      firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
    //Apple credential
    const credential = OAuthProvider.credentialFromResult(result);
    if (credential) {
      // You can also get the Apple OAuth Access and ID Tokens.
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
    }
    if (result.user) {
      setUserData(result, result.user.uid);
      setIsLoggedIn(true)
  }
    // The signed-in user info.
  })
  
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    //The credential that was used to sign-in.
    const credential = OAuthProvider.credentialFromError(error);
  })
  })};



  // fetches backend and persists user data across app
  const setUserData = async (response, userId) => {
    if (response.additionalUserInfo.isNewUser) {
      history.push({pathname: '/survey', state: {userId: userId}});
      console.log('new user')
    } else {
    get(`/users/${userId}`)
    .then(data => {
      if (data.detail === 'User not found') {
        console.log('user not found')
        history.push({pathname: '/survey', state: {userId: userId}});
      } else if (data.user_name == null) {
        history.push({pathname: '/username', state: {userId: userId}});
        console.log('no username')
      } 
      })
    .catch(error => {
    }).finally(() => setIsSaved(true))
  }
  }

  return (
    <>
    <Container className="page">
      <FormWrap>
        <LoginHeaderLogoWrapper>
          <LoginHeaderLogo src={logo} />
          <LoginHeaderImg src={headerImg}/>
      <ImgOverlay />
        </LoginHeaderLogoWrapper>
        <FormContent>
          <Form onSubmit={e => handleForm(e)}>
            {/* <FormH1>Login</FormH1> */}
            <FormLabel>Email</FormLabel>
        <FormInput
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
          ref={emailRef}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <GoogleButton onClick={() => signInWithGoogle()} className="googleBtn" type="button">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          <GoogleButtonText>
          Login With Google
          </GoogleButtonText>
        </GoogleButton>
        <Button onClick={() => signInWithApple()} className="appleBtn" type="button">
          Sign in with Apple
        </Button>
        <Button primary type="submit">Login</Button>
        <FormText>Don't have an account?<br/>
        Sign up <Link to='/signup'>here</Link>
        </FormText>
        <ForgotPasswordLink to='/forgotpassword'>Forgot Password</ForgotPasswordLink>
        <span>{error}</span>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default withRouter(Login);

const ForgotPasswordLink = styled(Link)`
  text-align: center;
  padding: 12px;
`

