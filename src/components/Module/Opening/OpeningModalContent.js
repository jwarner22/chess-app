import React from 'react'
import styled from 'styled-components'
import Subtitle from '../../UI_Kit/CategoryTitle/Subtitle'
import Button from '../../UI_Kit/Button/Button'
import { ModalImg } from '../../PostLogin/Views/DailyPuzzle/ModalElements'
import headerImg from "../../../Images/ModalHeaderImg.svg"

const OpeningModalContent = (props) => {




const {toggle, disableModal, handleDisableModal} = props

  return (<>
  <ModalImg src={headerImg}/>
    <Subtitle>Instructions:</Subtitle>
    <OpeningModalList>
        <li>
            Watch the opening move sequence play.
        </li>
        <li>
            Repeat the moves.
        </li>
        <li>
            After you complete the first sequence, the board will reset. Repeat the sequence two more times. 
        </li>
        <li>
            If you get stuck, you can always watch the move order again. 
        </li>
    </OpeningModalList>
    <OpeningModalFooter>
    <Button primary onClick={toggle}>Got it!</Button>
    <CheckBoxWrapper>
    <CheckBox type='checkbox' onChange={handleDisableModal} checked={disableModal}/>
    Don't show this again.
    </CheckBoxWrapper>
    </OpeningModalFooter>
    </>
  )
}

export default OpeningModalContent

const OpeningModalList = styled.ul`
    display: grid;
    grid-template-rows: min-content;
    grid-gap: 12px;
    padding: 16px;
`

const CheckBoxWrapper = styled.div`

`
const CheckBox = styled.input`
    margin-right: 8px;
`
const OpeningModalFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
`