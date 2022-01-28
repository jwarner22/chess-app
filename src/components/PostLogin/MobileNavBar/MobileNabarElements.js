import React from "react"
import {NavLink} from "react-router-dom"
import styled from "styled-components"

export const MobileNavbarWrapper = styled.div`
    position: fixed;
    bottom: 0; 
    left: 0;
    right:0;+
    transform: translateZ(0);
    background-color: #fff;
    /* margin-top: 8px 0px; */
    z-index: 9999;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`
export const MobileNavbarItems = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`
export const MobileNavLink = styled(NavLink)`
    text-decoration: none;
    color: #247cf1;
    transition: all 0.2s ease-in-out;
    padding: 8px 0px;
    height: 100%;
`


export const MobileNavbarItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    height: 100%;
    justify-content: center;
`
export const MobileNavbarIcon = styled.img`
    max-width: 45px;
`