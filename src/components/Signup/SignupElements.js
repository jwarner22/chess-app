import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-height: 692px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: #f6f9fc;
`;

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

`;

export const Form = styled.form`
  background: #fff;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 50px 32px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 30px;
  color: #247cf1;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #247cf1;
`;
export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
  background-color: #e9f1fc;
`;

export const FormButton = styled.button`
  background: #247cf1;
  padding: 16px 0;
  border-radius: 50px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
  }
`;
export const Text = styled.span`
  text-align: center;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #fff;
  font-size: 14px;
`;

export const GoogleLoginButton = styled.button`
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 0;
  border: none;
  width: 250px;
  border-radius: 50px;
  color: red;
  font-size: 18px;
  cursor: pointer;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;

  &:hover {
        transition: all 0.2s ease-in-out;
        background: red;
        color: #fff;
  }
`
