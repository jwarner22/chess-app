import React from 'react'
import Modal from "../../../UI_Kit/Modals/Modal"
import Subtitle from "../../../UI_Kit/CategoryTitle/Subtitle"
import { ModalImg } from '../DailyPuzzle/ModalElements'
import greyModalImg from '../../../../Images/GrayTileModalImg.svg'
import Paragraph from '../../../UI_Kit/CategoryTitle/Paragraph'

const GrayTileInfoModal = (props) => {

  const {isOpen, toggle} = props
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalImg src={greyModalImg} />
      <Subtitle>Why do I see gray tiles?</Subtitle>
      <Paragraph>The square tiles represent the next move in the opening tree. If the tiles are gray they need to be unlocked by completing the active opening tile.</Paragraph>
    </Modal>
  )
}

export default GrayTileInfoModal

