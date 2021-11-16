import React, {useState} from 'react'
import {InfoModalContainer} from "./InfoModalElements"

const InfoModal = ({openModal, setOpenModal}) => {
    return (
        <>
        {openModal ?  <InfoModalContainer>
            I'm a modal.
        </InfoModalContainer> : null}
        </>
    )
}

export default InfoModal
