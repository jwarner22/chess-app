import styled from "styled-components";

var primaryColor = '#5649b1'

export const ButtonStyle = styled.button`
  background: ${props => props.primary ? primaryColor : '#EFEFFD'};
  border-radius: 35px;
  color: ${props => props.primary ? '#fff' : '#161D4E'};
  outline: none;
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 24px;
  font-weight: 600;
  margin: 12px;
`