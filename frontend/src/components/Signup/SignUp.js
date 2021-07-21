import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import firebaseConfig from "../../config"
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text, GoogleLoginButton} from "./SignupElements";
import logo from '../../Images/EloElevation-2.png'
import {NavLogo, Img} from "../Login/LoginElements"
import "./Signup.css"


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  const onChangeHandler = event => {
    const {name, value} = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value)
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
              <Form>  {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
                <FormH1>Sign Up</FormH1>
                <FormLabel>Display Name</FormLabel>
                <FormInput
                type='text'
                value={displayName}
                placeholder="E.g: Joe_is_a_Dickface"
                id="displayName"
                name='displayName'
                onChange={event => onChangeHandler(event)}
                >
                </FormInput>
                <FormLabel>Email</FormLabel>
                <FormInput 
                type="email" 
                name="userEmail" 
                value={email}
                placeholder="Email"
                id="userEmail"
                onChange={event => onChangeHandler(event)} />
                <FormLabel>Password</FormLabel>
                <FormInput 
                type="password" 
                name="userPassword" 
                value={password}
                id="userPassword"
                placeholder="Password"
                onChange={event => onChangeHandler(event)} />
                <FormButton  onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}>
              Submit</FormButton>
              </Form>
                     <Text>or</Text>
                <GoogleLoginButton>               
                  Sign In with Google
                  </GoogleLoginButton>
             <Text className="orSignup">
                Already have an account?{" "}
                  <Link to="Login" className="text-blue-500 hover:text-blue-600">
                    Sign in here
                  </Link>
            </Text>
            </FormContent>
          </FormWrap>
      </Container>
    </>
  );
};

export default SignUp;