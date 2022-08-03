import React, { useState } from "react";
//import { AuthContext } from "../../index";
import logo from '../../Images/ChessReps Logo Horizontal White.png'
import headerImg from "../../Images/realChessHeader.jpg"
import { Link } from "react-router-dom";
import {  
  FormWrap, 
  FormContent, 
  FormLabel, 
  FormInput 
  } from "./SignupElements";
import {Container, 
  GoogleButton, 
  GoogleButtonText, 
  FormText,
  Form,
  LoginHeaderImg,
  ImgOverlay,
  LoginHeaderLogoWrapper,
  LoginHeaderLogo,  
  LoginButtonsGrid
} from "../Login/LoginElements"
import "./Signup.css"
import { withRouter } from 'react-router-dom';
import firebase from "firebase/compat/app";
import Button from "../UI_Kit/Button/Button";
import AppleSignUp from "../../Images/Sign up with Apple - Black 3.png";
import { AppleLoginButton } from "../UI_Kit/Button/AppleButtons";
require("firebase/auth");


const SignUp = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  //const [confirmPassword, passwordIsConfirmed] = useState("");
  //const {get,post} = useFetch(baseURL);
  //const Auth = useContext(AuthContext);

  const handleForm = e => {
    e.preventDefault();

    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            let userId = res.user.uid;
            history.push({pathname: '/survey', state: {userId: userId}});            }
        })
        .catch(e => {
          setErrors(e.message);
        });
      })

  };

  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(res => {
          if (res.user) {
          let userId = res.user.uid;
          history.push({pathname: '/survey', state: {userId: userId}});
          }
          //Auth.setLoggedIn(true)
          //setUserData(result)
        })
        .catch(e => setErrors(e.message))
      })
 
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
      {/* <FormH1>Join</FormH1> */}
      <FormLabel>Email</FormLabel>
        <FormInput
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <FormLabel>Create Your Password</FormLabel>
        <FormInput
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <FormLabel>Confirm Your Password</FormLabel>
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="re-enter password"
        />
        <LoginButtonsGrid>
        <GoogleButton onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          <GoogleButtonText>
          Sign up with Google
          </GoogleButtonText>
          </GoogleButton>
          <AppleLoginButton src={AppleSignUp} />
        <Button primary type="submit">Sign up</Button>
        </LoginButtonsGrid>
        <FormText>Already have an account?<br/>
        Login <Link to='/login'>here</Link>
        </FormText>
        <span>{error}</span>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default withRouter(SignUp);


