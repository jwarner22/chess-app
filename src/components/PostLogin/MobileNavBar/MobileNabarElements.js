import React from "react"
import {NavLink} from "react-router-dom"
import styled from "styled-components"
import { IoCalendarClearOutline } from "react-icons/io5"
import { IoBookOutline,IoCalendar } from "react-icons/io5"
import { AiOutlineUser } from "react-icons/ai";
import { IoExtensionPuzzleOutline, IoRibbonSharp } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { HiPuzzle } from "react-icons/hi";
import { FaBookOpen,FaUser } from "react-icons/fa";
import { BsFillCalendar3Fill } from "react-icons/bs";

export const MobileNavbarWrapper = styled.ul`
    position: fixed;
    bottom: 0; 
    left: 0;
    right: 0;
    transform: translateZ(0);
    background-color: #fff;
    /* margin-top: 8px 0px; */
    z-index: 9999;
    width: 95%;
    margin: auto;
    margin-bottom: 18px;
    border-radius: 35px;
    box-shadow:rgba(0, 0, 0, 0.2) 0px 10px 50px;
    overflow: hidden;    
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(50px, 1fr) );
    justify-content: space-evenly;
    align-items: center;
    height: 70px;
    padding: 0 12px;
`
// export const MobileNavbarItems = styled.ul`
//     display: grid;
//     grid-template-columns: repeat( auto-fit, minmax(50px, 1fr) );

//     justify-content: space-between;
//     align-items: center;
//     height: 80px;
// `
export const MobileNavLink = styled(NavLink)`
    text-decoration: none;
    color: #9CA1BC;
    transition: all 0.2s ease-in;
    padding: 8px 8px;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 9px;
    justify-content: flex-start;


    &.active{
        background: #5649B1;
        color: #fff;
        border-radius: 20px;
        box-shadow: rgba(86, 73, 177, 0.15) 0px 5px 15px 0px;
    }
`

export const NavItemTitle = styled.span`
    padding-top: 6px;
    font-size: 9px;
    text-align: center;

    &.active{
        display: none;
    }
`
// export const MobileNavbarItem = styled.li`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     font-size: 12px;
//     height: 100%;
//     justify-content: center;
// `

export const MobileNavbarIcon = styled.img`
    max-width: 45px;
`
