import styled from 'styled-components'
import {FaDiscord} from "@react-icons/all-files/fa/FaDiscord"
import {AiFillCloseCircle} from '@react-icons/all-files/ai/AiFillCloseCircle'

export const DiscordModalContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(255,255,255, 0.4);
    transition: 0.3s ease-in-out;
    opacity: ${({ isVisible }) => (isVisible ? '100%' : '0')};
`

export const TransparentButton = styled.button`
    background: none;
    outline: none;
`

export const DiscordModalBackground = styled.div`
    border-radius: 50px;
    height: 90px;
    width: 90px;
    margin: 0px 24px 24px 0px;
    box-shadow: 5px 5px 9px 5px #7289DA;
    display: flex;
    justify-content: center;
    align-content: center;
    background: #7289DA;
`

export const ModalCTA = styled.h3`
    color: #7289DA;
    top: -24px;
    text-align: center;
    padding: 12px;
`

export const CloseModal = styled(AiFillCloseCircle)`
    height: 30px;
    width: 30px;
    fill: #243862;
    position: absolute;
    left: -10%;
    top: -10%;
    cursor: pointer;
`
export const Close = styled.div`
    display: flex;
`

export const DiscordLogo = styled(FaDiscord)`
    height: 60%;
    width: 60%;
    fill: white;
    margin: auto 0px;
`