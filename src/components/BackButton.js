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
`
//onClick={() => history.goBack()}