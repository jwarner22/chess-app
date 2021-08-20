
import React, {useState, useContext } from "react";
import {Link, withRouter } from 'react-router-dom'
import { AuthContext } from "../../index";
import {FormH1, 
  Container, 
  FormWrap, 
  FormContent, 
  Form, 
  FormLabel, 
  FormInput, 
  FormButton,
  FormText,
  GoogleButton,
  GoogleButtonText
} from './LoginElements';
import firebase from "firebase/app";
import FetchWrapper from "../api/FetchWrapper";
import {baseURL} from '../api/apiConfig';

require("firebase/auth");


//history = push to dashboard
const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  
  const Auth = useContext(AuthContext);

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
            Auth.setLoggedIn(true);
            setUserData(res, res.user.uid);
          } 
          history.push('/dashboard')
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
        console.log(res)
        Auth.setLoggedIn(true);
        setUserData(res, res.user.uid);
      }).then(() => history.push('/dashboard'))
      .catch(e => setErrors(e.message))
    })
  };

  // fetches backend and persists user data across app
  const setUserData = (response, userID) => {
    // store in localStorage 
    localStorage.setItem('userID', userID)
    localStorage.setItem('isLoggedIn','true')
    
    const API = new FetchWrapper(baseURL)
    if (response.additionalUserInfo.isNewUser) {
      createNewUser(userID)
    } else {
    API.get(`/users/${userID}`)
    .then(data => {
      if (data.details === 'User not found') {
        createNewUser(userID)
      }
      localStorage.setItem('userPublicData', JSON.stringify(data))
    })
    .catch(error => {
      console.log(error)
    })
  }
  }

  const createNewUser = (userID) => {
    const API = new FetchWrapper(baseURL)
    API.post('/users/', {
      user_id: userID,
      rating: 1200
    }).then(data => {
      localStorage.setItem('userPublicData', JSON.stringify(data))
    })
  }

  return (
    <>
    <Container>
      <FormWrap>
        <FormContent>
          <Form onSubmit={e => handleForm(e)}>
            <FormH1>Login</FormH1>
            <FormLabel>Email</FormLabel>
        <FormInput
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
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
        <FormButton type="submit">Login</FormButton>
        <FormText>Don't have an account?<br/>
        Sign up <Link to='/signup'>here</Link>
        </FormText>
        <span>{error}</span>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default withRouter(Login);

// const LogIn = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const signInWithEmailAndPasswordHandler = 
//   (event, email, password) => {
//     event.preventDefault();
//   };

//     const onChangeHandler = (event) => {
//       const {name, value} = event.currentTarget;
    
//       if (name === 'userEmail') {
//         setEmail(value);
//       } 
//       else if (name === 'userPassword') {
//         setPassword(value)
//       }
//     };
   

  
//   return (
//     <>
//     <Container>
//       <FormWrap>
//         <NavLogo>
//           <Link to="/" >
//           <Img src={logo}/>
//           </Link>
//         </NavLogo>
//           <FormContent> 
//               <Form>
//               {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
//                 <FormH1>Log In</FormH1>
//                 <FormLabel for="email">Email</FormLabel>
//                 <FormInput 
//                   type="email" 
//                   name="userEmail" 
//                   placeholder="Email" 
//                   value={email}
//                   id="userEmail"
//                   onChange= {(event) => onChangeHandler(event)}
//                   />
//                 <FormLabel for="password">Password</FormLabel>
//                 <FormInput 
//                   type="password" 
//                   name="userPassword" 
//                   placeholder="Password" 
//                   value={password}
//                   id="userPassword"
//                   onChange = {(event) => onChangeHandler(event)}
//                   />
//                 <FormButton 
//                 type="submit"
//                 onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
//                 >Submit</FormButton>
//                 <LinkP to="passwordReset">Forgot Password?</LinkP>
//               </Form>
//               <Text>or</Text>
//         <GoogleLoginButton>
//           Sign in with Google
//           </GoogleLoginButton>
//         <Text>
//           Don't have an account?{" "}
//           <Link to="signUp" className="text-blue-500 hover:text-blue-600">
//             Sign up here
//           </Link>{" "}
//           <br />{" "}
//           </Text>
//             </FormContent>
//           </FormWrap>
//     </Container>
//     </>
// );
//   };

// export default LogIn;