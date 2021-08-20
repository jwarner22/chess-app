import React, { useState, useContext } from "react";
//import { AuthContext } from "../../index";
import { Link, Redirect } from "react-router-dom";
import firebaseConfig from "../../config"
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, Text, GoogleLoginButton} from "./SignupElements";
import logo from '../../Images/EloElevation-2.png'
import {NavLogo, Img, GoogleButton, GoogleButtonText, FormButton, FormText} from "../Login/LoginElements"
import "./Signup.css"
import { withRouter } from 'react-router-dom';
import firebase from "firebase/app";
import FetchWrapper from '../api/FetchWrapper'
import {baseURL} from '../api/apiConfig'
require("firebase/auth");


const SignUp = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

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
          console.log(res)
          history.push('/dashboard')
          if (res.user) {
            //Auth.setLoggedIn(true)
            setUserData(res)
          };
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
        .then(result => {
          console.log(result)
          history.push('/dashboard')
          //Auth.setLoggedIn(true)
          setUserData(result)
        })
        .catch(e => setErrors(e.message))
      })
 
  }

    // fetches backend and persists user data across app
    const setUserData = (response) => {
      console.log(response)
      let userID = response.additionalUserInfo.profile.id;
      localStorage.setItem('userID', userID)
      const API = new FetchWrapper(baseURL)
      if (response.additionalUserInfo.isNewUser) {
        console.log('post new user to API')
        API.post('/users/', {
          user_id: userID,
          rating: 1200
        }).then(data => {
          console.log(data);
          localStorage.setItem('userPublicData', JSON.stringify(data))
        })
      } else {
      API.get(`/users/${userID}`)
      .then(data => {localStorage.setItem('userPublicData', JSON.stringify(data))})
      .catch(error => {
        console.log(error)
      })
    }
    }


  return (
    <>
    <Container>
      <FormWrap>
      <FormContent>
      <Form onSubmit={e => handleForm(e)}>
      <FormH1>Join</FormH1>
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
        <GoogleButton onClick={() => handleGoogleLogin()} class="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          <GoogleButtonText>
          Join With Google
          </GoogleButtonText>
          </GoogleButton>
        
        <FormButton type="submit">Join</FormButton>
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


// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [displayName, setDisplayName] = useState('');
//   const [error, setError] = useState(null);
//   const createUserWithEmailAndPasswordHandler = (event, email, password) => {
//     event.preventDefault();
//     setEmail('');
//     setPassword('');
//     setDisplayName('');
//   };

//   const onChangeHandler = event => {
//     const {name, value} = event.currentTarget;
//     if (name === "userEmail") {
//       setEmail(value);
//     } else if (name === "userPassword") {
//       setPassword(value);
//     } else if (name === "displayName") {
//       setDisplayName(value)
//     }
//   };
//   return (
//     <>
//       <Container>
//         <FormWrap>
//           <NavLogo>
//             <Link to="/" >
//             <Img src={logo}/>
//             </Link>
//           </NavLogo>
//             <FormContent>
//               <Form>  {error !== null && (
//           <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
//             {error}
//           </div>
//         )}
//                 <FormH1>Sign Up</FormH1>
//                 <FormLabel>Display Name</FormLabel>
//                 <FormInput
//                 type='text'
//                 value={displayName}
//                 placeholder="E.g: Joe_is_a_Dickface"
//                 id="displayName"
//                 name='displayName'
//                 onChange={event => onChangeHandler(event)}
//                 >
//                 </FormInput>
//                 <FormLabel>Email</FormLabel>
//                 <FormInput 
//                 type="email" 
//                 name="userEmail" 
//                 value={email}
//                 placeholder="Email"
//                 id="userEmail"
//                 onChange={event => onChangeHandler(event)} />
//                 <FormLabel>Password</FormLabel>
//                 <FormInput 
//                 type="password" 
//                 name="userPassword" 
//                 value={password}
//                 id="userPassword"
//                 placeholder="Password"
//                 onChange={event => onChangeHandler(event)} />
//                 <FormButton  onClick={event => {
//               createUserWithEmailAndPasswordHandler(event, email, password);
//             }}>
//               Submit</FormButton>
//               </Form>
//                      <Text>or</Text>
//                 <GoogleLoginButton>               
//                   Sign In with Google
//                   </GoogleLoginButton>
//              <Text className="orSignup">
//                 Already have an account?{" "}
//                   <Link to="Login" className="text-blue-500 hover:text-blue-600">
//                     Sign in here
//                   </Link>
//             </Text>
//             </FormContent>
//           </FormWrap>
//       </Container>
//     </>
//   );
// };

// export default SignUp;