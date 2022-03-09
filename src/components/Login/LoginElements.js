import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  
  /* position: fixed; */
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  background: #EEF0FF;
`;

export const LoginHeaderImg = styled.img`
  /* clip-path: circle(100px at center) */
  border-radius: 50%;
  position: fixed;
  width: 530px;
  height: 530px;
  top: -270px;
  transform: scaleX(-1);
  overflow: hidden;
  margin: auto;
`

export const ImgOverlay = styled.div`
  border-radius: 50%;
  position: fixed;
  width: 530px;
  height: 530px;
  top: -270px;
  background: linear-gradient(341.33deg, rgba(0, 13, 255, 0.8) 20.21%, rgba(107, 115, 255, 0.8) 83.15%);
  overflow: hidden;
  margin: auto;
`

export const LoginHeaderLogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const LoginHeaderLogo = styled.img`
  width: 193px;
  height: 193px;
  z-index: 999;
`

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 400px) {
    height: 100%;
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
  justify-content: flex-start;
`;

export const Form = styled.form`
  position: fixed;
  left: 0; 
  right: 0; 
  background: #fff;
  max-width: 350px;
  height: auto;
  width: 90%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 50px 32px;
  border-radius: 30px;
  box-shadow: 0px 5px 15px rgba(94, 137, 249, 0.25);
  transition: 0.2 ease-in-out ;

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }


`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #243862;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #243862;
  font-weight: 500;
`;
export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
  box-shadow: rgba(36, 124, 241, 0.3) 0px 3px 8px;
  background-color: #e9f1fc;
  transition: 0.4 ease-in-out ;

  &:focus {
    outline: 2px solid rgba(36, 124, 241, 0.7)
  }
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
  margin-bottom: 10px;


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
    background: #010EFF;
    padding: 12px 0;
    border: none;
    border-radius: 50px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    margin-top: 12px;

  &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
  }

  &:active {
    box-shadow: none;
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
