import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
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

export const NavLogo = styled.div`
    justify-self: flex-start;
    display: flex;
    align-items: center;
    margin-left: 24px;
`;

export const Img = styled.img`
    height: 120px;
    width: 160px;
    cursor: pointer;
`

// Old Logo placeholder for login page. 
// export const Icon = styled(Link)`
//   margin-left: 32px;
//   margin-top: 32px;
//   text-decoration: none;
//   color: #fff;
//   font-weight: 700;
//   font-size: 32px;

//   @media screen and (max-width: 480px) {
//     margin-left: 16px;
//     margin-top: 8px;
//   }
// `;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
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
  box-shadow: rgba(36, 124, 241, 0.2) 0px 3px 8px;

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #247cf1;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #247cf1;
  font-weight: 500;
`;
export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
`;

export const GoogleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
  width: auto;
  height: 42px;
  cursor: pointer;
  border: none;


`
export const GoogleIconWrapper = styled.div`

    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: #fff;

`
export const GoogleIcon = styled.img` 
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
`

export const GoogleButtonText = styled.p`
    justify-self: center;
    align-self: center;
    margin-left: 10px;
    margin-bottom: 0px;
    color: gray;
    font-size: 16px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
`

export const FormButton = styled.button`
  background: #247cf1;
  padding: 12px 0;
  border: none;
  border-radius:10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #247cf1;
  }
`
export const LinkP = styled(Link)`
  text-align: center;
  margin-top: 24px;
  color: #54606c;
  font-size: 14px;
  text-decoration: none;
`

export const FormText = styled.span`
  text-align: center;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #54606c;
  font-size: 14px;

`;
