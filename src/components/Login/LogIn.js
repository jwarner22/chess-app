
import React, {useState, useContext } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../index";
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
import { withRouter } from 'react-router-dom'
import firebase from "firebase/app";
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
          if (res.user) Auth.setLoggedIn(true);
          history.push('/dashboard')
        })
        .catch(e => {
          setErrors(e.message);
        });
      })
  
  };
//Sign in with Google Popup
  const signInWithGoogle = () => {
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
        Auth.setLoggedIn(true)
        history.push('/dashboard')
      })
      .catch(e => setErrors(e.message))
    })
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />
        <button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
        <button type="submit">Login</button>
        <span>{error}</span>
      </form>
    </div>
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