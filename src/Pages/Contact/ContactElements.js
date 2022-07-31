import styled from 'styled-components';

export const EmailContactWrapper = styled.div`
    display: flex;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0px 5px 15px rgba(94, 137, 249, 0.25);
    padding: 12px;
`

export const EmailIcon = styled.img`
    height: 24px;
    width: auto;
    padding-right: 12px;
`

export const MailToLink = styled.a`
    text-decoration: none;
    cursor: pointer;
`

export const SubjectText = styled.textarea`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
    background-color: #e9f1fc;
    height: 100px;
    max-width: 100%;

  &:focus {
    outline: 2px solid rgba(36, 124, 241, 0.7)
  }
`