import styled from 'styled-components';

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .8);  
`

export const ModalHeader = styled.div`
  background: white;
  max-width: 800px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  grid-template-columns: 80px 1fr;
  margin: 0 auto;
  padding: 10px 22px;
  border-radius: 4px;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
  transition: all 0.3s ease-in-out;


  animation-name: grow-modal;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;

  @keyframes grow-modal {
      0% { opacity: .2; }
      25% { opacity: .4; }
      50% { opacity: .6; }
      75% { opacity: .8; }
      100% { width: 410px; height: 190px; opacity: .9; }
    }
`

export const ModalClose = styled.span`
  justify-content: start;
  font-size: 32px;
  cursor: pointer;
  grid-column: 1 / span 2;
`

export const ModalImg = styled.img`
  display: block;
  margin: auto;
  width: 120px;
  height: 120px;
  grid-column: 1 / span 2;

`

export const ModalTitle = styled.h1`
  text-align: center;
  color: #247cf1;
  margin-top: 30px;
  grid-column: 1 / span 2;
`

export const ModalSubheading = styled.h2`
  text-align: center;
  color: #333;
  grid-column: 1 / span 2;
  font-weight: 600;
`

export const ModalBodyImg = styled.img`
  margin: auto;
    width: 50px;
    height: 50px;
    grid-row: span 2;
    grid-column: 1;
`
export const ModalBodyH3 = styled.h3`
  text-align: left;
  color: #333;
  grid-column: 2;
  margin-top: 15px;
`

export const ModalBodyP = styled.p`
  text-align: left;
  color: #333;
  grid-column: 2;
  margin-bottom: 8px;
`

export const StartButton = styled.button`
    white-space: nowrap;
    padding: 8px 16px;
    margin: 16px 4px 24px 4px;
    color: #fff;
    font-size: 22px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    min-width: 150px;
    font-weight: 400;
    grid-column: 1 / span 2;
    background: #010EFF;
    border-radius: 16px;
    box-shadow: 0px 8px 15px rgba(1, 14, 255, 0.24);

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010EFF;
    }
`
