import React from 'react'
import { XIcon } from '../../BackButton'
import { ModalClose, ModalHeader, ModalWrapper } from './ModalElements'


const Modal = (props) => {


const {children, isOpen, toggle} = props

return (<>
    <ModalWrapper isOpen={isOpen}>
        <ModalHeader>
            <ModalClose onClick={toggle}>
                <XIcon />
            </ModalClose>
            {children}
        </ModalHeader>
    </ModalWrapper>
    </>
  )
}

export default Modal