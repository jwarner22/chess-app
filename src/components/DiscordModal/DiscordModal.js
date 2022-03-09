import { CloseModal, 
    DiscordLogo, 
    DiscordModalBackground, 
    DiscordModalContainer, 
    ModalCTA, 
    Close} from './DiscordModalElements'


const DiscordModal = ({isVisible, toggle}) => {


  return (
    <DiscordModalContainer isVisible={isVisible}>
        <Close onClick={toggle}>
            <CloseModal /> 
        </Close>
        <ModalCTA>
            Join our Discord!
        </ModalCTA>
        <a href='https://discord.gg/v9k6sE3E' target='_blank'>
            <DiscordModalBackground>
                <DiscordLogo />
            </DiscordModalBackground>
        </a>
    </DiscordModalContainer>
  )
}

export default DiscordModal