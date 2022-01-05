import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import {Link, withRouter} from 'react-router-dom';
import swal from 'sweetalert';
import useFetch from '../../api/useFetch';
import { baseURL } from '../../api/apiConfig';
import {Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap} from "../../Login/LoginElements"

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
        let response = await get('/users/username/' + value)
        //let confirmatin = true;
        console.log(response)
        if (response === 'username is available') {
            // render positive message
            console.log('render positive message')
            setConfirmation(true);
            return true;
        
        } else if (response === 'username already exists') {
            // render username taken message
            console.log('render username taken message')
            setConfirmation(false);
            return false;
        } 
    }

    const checkUserName = async (e) => {
        getUserNameValidation(e.target.value);
        // let response = await get('/users/username/' + e.target.value)
        // //let confirmatin = true;
        // console.log(response)
        // if (response === 'username is available') {
        //     // render positive message
        //     console.log('render positive message')
        //     setConfirmation(true);
        //     return true;
        
        // } else if (response === 'username already exists') {
        //     // render username taken message
        //     console.log('render username taken message')
        //     setConfirmation(false);
        //     return false;
        // } 
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
        console.log('post username to database')
        console.log('other message')
        console.log({username: value})
        let userID = localStorage.getItem('userID');
        //console.log(confirmation)
        let confirmation_response = await getUserNameValidation(value);
        console.log(confirmation_response)
        if (confirmation_response) {
            try {
                console.log('post username to database')
                //post('/users/username/value)')
                //history.push('/postlogin/profile')
            } catch(err) {
                console.log(err)
                //checkUserName(value)
            }
        } else {
            console.log('username taken')
            swal({
                title: "Username is taken"})
        }
    }



    return (
        <div>
            <Container className="page">
                <UsernameContainer>
                            <Form>
                                <FormH1>Enter Username</FormH1>
                                <FormLabel>This username will be visible to other users</FormLabel>
                                <div>{message}</div>
                                <FormInput type="text" placeholder="Ex. Joe is gay" onChange={e=>handleChange(e)} onKeyDown={e=>handleKeyDown(e)}/>
                                <FormButton onClick={triggerChange}>Submit</FormButton>
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