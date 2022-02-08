import styled from "styled-components"

export const SuggestionFormContainer = styled.form`
  position: fixed;
  left: 0; 
  right: 0; 
  background: #fff;
  max-width: 1080px;
  height: 60%;
  width: 90%;
  z-index: 1;
  margin: 0 auto;
  padding: 50px 32px;
  border-radius: 30px;
  box-shadow: 0px 5px 15px rgba(94, 137, 249, 0.25);
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`

export const FormLabel = styled.label`
  margin-bottom: 16px;
  font-size: 24px;
  color: #243862;
  font-weight: 600;
`

export const SuggestionTextArea = styled.textarea`
    resize: none;
    max-height: 500px;
    height: 100%;
    padding: 16px 16px;
    padding: 16px 16px;
    margin: 16px 0px;
    border: none;
    border-radius: 4px;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  
`