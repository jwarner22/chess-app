import {useContext, useState} from 'react';
import { Form, FormH1, FormInput, FormLabel, FormWrap } from "../../components/Login/LoginElements"
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Button from "../../components/UI_Kit/Button/Button"
import { PageContainer } from "../../components/UI_Kit/Page"
import firebase from "firebase/compat/app";
require("firebase/auth");

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Check your Mail!')
        })
        .catch((err) => {
            alert(err.message)
        })
}

  return (
    <PageContainer>
      <FormWrap>
        <Form>
          <FormH1>
            Forgot your password?
          </FormH1>
          <FormLabel>
              We'll send a recovery link to
            </FormLabel>
            <FormInput 
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email" 
              name="email" 
              type="email"/>
              <Button primary onClick={handlePasswordReset}>
                Send Recovery Link
                </Button>
                <BackToLoginLink to='/login'>Back to Login</BackToLoginLink>
        </Form>
      </FormWrap>
    </PageContainer>
  )
}

export default ForgotPassword

const BackToLoginLink = styled(Link)`
  text-align: center;
  padding: 12px;
`