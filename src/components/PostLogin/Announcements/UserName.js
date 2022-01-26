import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {withRouter} from 'react-router-dom';
import swal from 'sweetalert';
import useFetch from '../../api/useFetch';
import { baseURL } from '../../api/apiConfig';
import {Container, Form, FormButton, FormH1, FormInput, FormLabel} from "../../Login/LoginElements"

const ENTER_KEY = 13;
const WAIT_INTERVAL = 1000;

const UserName = ({history}) => { 
    const [confirmation, setConfirmation] = useState(null);
    const [value, setValue] = useState(''); //username input value
    const [message, setMessage] = useState(''); //message to display
    const [timer, setTimer] = useState(null); //timer for input
    const {get, post} = useFetch(baseURL);

    useEffect(() => {
        if (confirmation) {
            setMessage('Username is available')
        } else if (confirmation == null) {
            setMessage('')
        } else {
            setMessage('Username is already been taken')
        }
    },[confirmation])

    const getUserNameValidation = async (value) => {
        // check if username is available
        let response = await get('/users/username/' + value)

        if (response === 'username is available') {
            // render username available message
            setConfirmation(true);
            return true;
        
        } else if (response === 'username already exists') {
            // render username taken message
            setConfirmation(false);
            return false;
        } 
    }

    const checkUserName = async (e) => {
        getUserNameValidation(e.target.value);
    }

    const handleChange = (e) => {
        clearTimeout(timer);
        setValue(() => e.target.value);
        setTimer(setTimeout(() => checkUserName(e), WAIT_INTERVAL));
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            triggerChange(e);
        } 
    }

    const triggerChange = async (e) => {
        // api call to check if username is valid

        // get user id from local storage
        let userID = localStorage.getItem('userID');

        // check that username is available
        let confirmation_response = await getUserNameValidation(value);

        if (confirmation_response) {
            try {
                // post username to database
                const response = await post(`/users/username/${userID}/${value}`)

                // pessimistic checks
                if (response === 'username successfully updated') {
                    history.push('/home/daily')
                } else if (response === 'username already exists') {
                    swal('Username already exists')
                } else {
                    swal('Error: user not found. Please sign in.')
                }
    
            } catch(err) {
                alert(err)
            }
        } else {
            console.log('username taken')
            swal({
                title: "Username is taken"})
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        triggerChange(e);
    }

    return (
        <div>
            <Container className="page">
                <UsernameContainer>
                            <Form onSubmit={handleFormSubmit}>
                                <FormH1>Enter Username</FormH1>
                                <FormLabel>This username will be visible to other users</FormLabel>
                                <div>{message}</div>
                                <FormInput type="text" placeholder="Ex. username" onChange={e=>handleChange(e)} onKeyDown={e=>handleKeyDown(e)}/>
                                <FormButton>Submit</FormButton>
                            </Form>
                </UsernameContainer>
            </Container>
        </div>
    )
}
export default withRouter(UserName);

const UsernameContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`