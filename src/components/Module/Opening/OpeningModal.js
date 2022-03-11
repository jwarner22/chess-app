import React from 'react';
import Modal from '../../UI_Kit/Modals/Modal';
import OpeningModalContent from './OpeningModalContent';


const OpeningModal = (props) => {
  return (
    <>
        <Modal>
            <OpeningModalContent />
        </Modal>
    </>
  )
}

export default OpeningModal