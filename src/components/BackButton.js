import React from 'react'
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import { GrFormClose } from "react-icons/gr";

const BackButton = () => {
    let history = useHistory();

    return (
        <div>
            <ClickBack>
           <GrFormClose size={32} onClick={() => history.goBack()}>Back</GrFormClose> 
           </ClickBack>
        </div>
    )
}

export default BackButton

const ClickBack = styled.div`
    display: flex;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 40px;
    padding-left: 40px;

    @media screen and (max-width: 450px){
        top: 0;
        left: 0;
        padding-top: 12px;
        padding-left: 12px;
    }
`