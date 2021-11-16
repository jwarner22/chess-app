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
`