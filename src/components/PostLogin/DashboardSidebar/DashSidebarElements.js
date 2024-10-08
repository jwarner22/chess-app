import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {FaTimes} from '@react-icons/all-files/fa/FaTimes'

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100vw;
    background: #fff;
    height: 100%;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')};
   
`
export const CloseIcon = styled(FaTimes) `
    color: #247cf1;
`

export const Icon = styled.div `
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
    color: #247cf1;
`

export const SidebarWapper = styled.div `
    color: #fff;
`

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;

    @media screen and (max-width: 480px) {
        grid-template-rows: repeat(6, 60px)
    }
`

export const SidebarLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: #247cf1;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        color: #01bf71;
        transition: 0.2s ease-in-out;
    }
`

export const SideBtnWrap = styled.div `
    display: flex;
    justify-content: center;
`

export const SidebarRoute = styled(Link)`
    border-radius: 50px;
    background: #247cf1;
    white-space: nowrap;
    padding: 16px 48px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    border: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    margin: 40px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #0e65d8;
    }
`