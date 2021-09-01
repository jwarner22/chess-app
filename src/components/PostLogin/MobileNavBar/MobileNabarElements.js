import React from "react"
import {NavLink} from "react-router-dom"
import styled from "styled-components"

export const MobileNavbarWrapper = styled.div`
    position: fixed;
    width: 100vw;
    bottom: 0; 
    transform: translateZ(0);
    background-color: #fff;
    margin-top: 8px 0px;
`
export const MobileNavbarItems = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: fixed;
    width: 100vw;
    bottom: 0;
    transform: translateZ(0);
    background-color: #247cf1;
`
export const MobileNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;
    transition: all 0.2s ease-in-out;
    padding: 8px 0px;

`


export const MobileNavbarItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    flex-grow: 1;
    
`
export const MobileNavbarIcon = styled.span`

`