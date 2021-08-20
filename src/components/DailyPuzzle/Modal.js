import React, { Component } from "react";
import { ModalWrapper, ModalHeader, ModalClose, ModalTitle, ModalImg, ModalSubheading, ModalStartButton} from "./ModalElements"
import {ModalData} from "./ModalData"
import {ModalContent} from "./ModalContent"
import headerImg from "./../../Images/ModalHeaderImg.svg"

export default class Modal extends Component {
  //closes the popup
  handleClick = () => {
   this.props.toggle();
  };
render() {
  console.log(ModalData)
  return (
   <ModalWrapper>
        <ModalHeader>
            <ModalClose 
            //closes the popup
              className="close" 
              onClick={this.handleClick}>&times;</ModalClose>
            <ModalImg src={headerImg}/>
            <ModalTitle>Welcome to your daily exercise!</ModalTitle>
            <ModalSubheading>Let's get learning!</ModalSubheading>
            {ModalData.map((module, index) => {
                        return (
            <ModalContent key={index} {...module}/>
            )})}
            <ModalStartButton onClick={this.handleClick}>
                View Daily Puzzles
            </ModalStartButton>
        </ModalHeader>
    </ModalWrapper>
  );
 }
}

 