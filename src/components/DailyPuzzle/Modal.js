import React, { Component } from "react";
import {ModalContainer, ModalWrapper, ModalContent} from "./ModalElements"


export default class Modal extends Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <ModalWrapper>
     <ModalContainer>
        <ModalContent>
     <span className="close" onClick={this.handleClick}>&times;    </span>
     <p>Welcome to your daily exercise!</p>
        </ModalContent>
     </ModalContainer>
    </ModalWrapper>
  );
 }
}

 