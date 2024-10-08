import styled from 'styled-components'
import { Link as LinkR } from "react-router-dom"
import { Link as LinkS } from "react-scroll"

export const Nav = styled.nav`
    background: ${({ scrollNav }) => (scrollNav ? '#transparent' : '#transparent')};
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    font-weight: bold;
    text-decoration: none;
`;

export const Img = styled.img`
    height: 48px;
    width: 242px; 
`

export const MobileIcons = styled.div `
    display: none;

    @media screen and (max-width: 640px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.li `
    height: 80px;
`;

export const NavLinks = styled(LinkS)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        border-bottom: 3px solid #247cf1;
        font-weight: bold;
    }

    &.hover{
        transition: all 0.2s ease-in-out;
        color: #247cf1;
    }
`;

export const NavDirectLink = styled(LinkR)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
`

export const NavBtn = styled.nav `
    display: flex;
    align-items: center;

    @media screen and (max-width: 640px) {
        display: none;
    }
`;

export const NavBtnLink = styled(LinkR)`
    /* border-radius: 50px;
    background: #247cf1;
    white-space: nowrap;
    padding: 10px 22px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0e65d8;
        color: #fff;
    } */
`;

export const NavBtnLink2 = styled(LinkR)`
    text-decoration: none;
    /* border-radius: 50px;
    background: transparent;
    white-space: nowrap;
    padding: 10px 22px;
    margin-right: 10px;
    color: #247cf1;
    font-size: 16px;
    outline: none;
    border: 2px solid #247cf1;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    max-width: 180px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #247cf1;
    } */
`;


