import React, { useState, useContext } from "react";
//import { AuthContext } from "../../index";
import logo from '../../Images/eloElevationWhite.png'
import headerImg from "../../Images/realChessHeader.jpg"
import { Link, Redirect } from "react-router-dom";
import firebaseConfig from "../../config"
import {  
  FormWrap, 
  Icon, 
  FormContent, 
  FormH1, 
  FormLabel, 
  FormInput, 
  Text, 
  GoogleLoginButton} from "./SignupElements";
import {Container, 
  NavLogo, 
  Img, 
  GoogleButton, 
  GoogleButtonText, 
  FormButton, 
  FormText,
  Form,
  LoginHeaderImg,
  ImgOverlay,
  LoginHeaderLogoWrapper,
  LoginHeaderLogo  
} from "../Login/LoginElements"
import "./Signup.css"
import { withRouter } from 'react-router-dom';
import firebase from "firebase/app";
//import FetchWrapper from '../api/FetchWrapper'
import {baseURL} from '../api/apiConfig'
import useFetch from '../api/useFetch';
require("firebase/auth");


const SignUp = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [confirmPassword, passwordIsConfirmed] = useState("");
  const {get,post} = useFetch(baseURL);
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
            let userID = res.user.uid;
            console.log({res:res})
            localStorage.setItem('userID', userID)
            history.push('/survey')
            }
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
          let userID = res.user.uid;
          localStorage.setItem('userID', userID)
          history.push('/survey')
          }
          //Auth.setLoggedIn(true)
          //setUserData(result)
        })
        .catch(e => setErrors(e.message))
      })
 
  }

    // // fetches backend and persists user data across app
    // const setUserData = (response) => {
    //   let userID = response.additionalUserInfo.profile.id;
    //   localStorage.setItem('userID', userID)
    //   if (response.additionalUserInfo.isNewUser) {
    //     console.log('post new user to API')
    //     post('/users', {
    //       user_id: userID,
    //       overall_rating: 1200
    //     }).then(data => {
    //       localStorage.setItem('userPublicData', JSON.stringify(data))
    //     })
    //   } else {
    //   get(`/users/${userID}`)
    //   .then(data => {localStorage.setItem('userPublicData', JSON.stringify(data))})
    //   .catch(error => {
    //     console.log(error)
    //   })
    // }
    // }


  return (
    <>
    <Container className="page">
    <LoginHeaderImg src={headerImg}/>
      <ImgOverlay />
        <FormWrap>
          <LoginHeaderLogoWrapper>
           <LoginHeaderLogo src={logo} />
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
        <GoogleButton onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
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