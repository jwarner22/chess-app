import React from "react";
import {ButtonStyle} from "./ButtonElements"

export default function Button(props) {
  const {children, ...rest} = props;

  return (
    <ButtonStyle{...rest}>{children}</ButtonStyle>
  )
}