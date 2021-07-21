import React, {useState } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseConfig from "../../config.js";
import logo from '../../Images/EloElevation-2.png'
import {GoogleLoginButton} from "./../Signup/SignupElements"
import {FormH1, 
  Container, 
  FormWrap, 
  Icon, 
  FormContent, 
  Form, 
  FormLabel, 
  FormInput, 
  FormButton,
  Text,
  NavLogo,
  Img,
  LinkP
} from './LoginElements'

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = 
  (event, email, password) => {
    event.preventDefault();
  };

    const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
    
      if (name === 'userEmail') {
        setEmail(value);
      } 
      else if (name === 'userPassword') {
        setPassword(value)
      }
    };
   

  
  return (
    <>
    <Container>
      <FormWrap>
        <NavLogo>
          <Link to="/" >
          <Img src={logo}/>
          </Link>
        </NavLogo>
          <FormContent> 
              <Form>
              {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                <FormH1>Log In</FormH1>
                <FormLabel for="email">Email</FormLabel>
                <FormInput 
                  type="email" 
                  name="userEmail" 
                  placeholder="Email" 
                  value={email}
                  id="userEmail"
                  onChange= {(event) => onChangeHandler(event)}
                  />
                <FormLabel for="password">Password</FormLabel>
                <FormInput 
                  type="password" 
                  name="userPassword" 
                  placeholder="Password" 
                  value={password}
                  id="userPassword"
                  onChange = {(event) => onChangeHandler(event)}
                  />
                <FormButton 
                type="submit"
                onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
                >Submit</FormButton>
                <LinkP to="passwordReset">Forgot Password?</LinkP>
              </Form>
              <Text>or</Text>
        <GoogleLoginButton>
          Sign in with Google
          </GoogleLoginButton>
        <Text>
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          </Text>
            </FormContent>
          </FormWrap>
    </Container>
    </>
);
  };

export default LogIn;