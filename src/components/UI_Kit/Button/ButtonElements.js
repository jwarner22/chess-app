import styled from "styled-components";

var primaryColor = '#1161d4'

export const ButtonStyle = styled.button`
  background: ${props => props.primary ? primaryColor : '#EFEFFD'};
  border-radius: 35px;
  color: ${props => props.primary ? '#fff' : '#161D4E'};
  outline: none;
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 400;
  margin: auto;
  width: 100%;
  white-space: nowrap;

`