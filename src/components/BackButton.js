import React from 'react'
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import { GrFormClose } from "react-icons/gr";
import swal from 'sweetalert';

const BackButton = () => {
    let history = useHistory();

    const handleClick = () => { 
        swal({
            title: "Are you sure?",
            text: "All progress will be lost.",
            icon: "warning",
            dangerMode: true,
            buttons: true
          })
          .then(willDelete => {
            if (willDelete) {
                history.goBack()
            }
          });
    }

    return (
        <div>
            <ClickBack>
           <GrFormClose size={32} onClick={() => handleClick()}>Back</GrFormClose> 
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

//onClick={() => history.goBack()}
