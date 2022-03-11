import styled from 'styled-components'

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .8); 
  z-index : 999;
`

export const ModalHeader = styled.div`
  background: white;
  max-width: 400px;
  height: auto;
  width: 95%;
  z-index: 1;
  margin: 0 auto;
  padding: 18px 22px;
  border-radius: 4px;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
  transition: all 0.3s ease-in-out;
`

export const ModalClose = styled.span`
    position: relative;
    top: 0;
    left: 0;
`