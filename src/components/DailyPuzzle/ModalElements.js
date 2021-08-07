import styled from 'styled-components';

export const ModalWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
`

export const ModalContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
`

export const ModalContent = styled.div`
  background: white;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 50px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

`