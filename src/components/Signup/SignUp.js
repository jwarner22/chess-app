import React, { useState, useContext } from "react";
import { AuthContext } from "../../index";
import { Link, Redirect } from "react-router-dom";
import firebaseConfig from "../../config"
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text, GoogleLoginButton} from "./SignupElements";
import logo from '../../Images/EloElevation-2.png'
import {NavLogo, Img} from "../Login/LoginElements"
import "./Signup.css"
import {auth} from "../../config"
import { withRouter } from 'react-router-dom';
import firebase from "firebase/app";
require("firebase/auth");


const SignUp = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
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
          if (res.user) Auth.setLoggedIn(true);
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
          Auth.setLoggedIn(true)
        })
        .catch(e => setErrors(e.message))
      })
 
  }


  return (
    <div>
      <h1>Join</h1>
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
        <button onClick={() => handleGoogleLogin()} class="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Join With Google
        </button>

        <button type="submit">Login</button>

        <span>{error}</span>
      </form>
    </div>
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