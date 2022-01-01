import React from 'react'
import {BiDoorOpen} from "react-icons/bi"
import {NavLink} from "react-router-dom"
import { BiBrain } from "react-icons/bi"
import { IoCalendarClearOutline } from "react-icons/io5"
import { IoBookOutline } from "react-icons/io5"
import { AiOutlineUser } from "react-icons/ai";
import { GiEmptyChessboard } from "react-icons/gi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import {Container} from '../Views/DailyPuzzle/DailyPuzzleElements'
import {MobileNavbarWrapper, 
    MobileNavbarItems, 
    MobileNavbarItem, 
    MobileNavbarIcon, 
    Styles,
    MobileNavLink    
} from "./MobileNabarElements"
import { BlueBars } from '../DashboardNavbar/DashboardNavElements'
import leaderboard from "../../../Images/LeaderboardMenuBlue.svg"


const MobileNabar = () => {
    return (
        <>
        <MobileNavbarWrapper>
            <MobileNavbarItems>
                <MobileNavLink to="/dashboard" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>                  
                        <IoExtensionPuzzleOutline size={32} />                  
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/dailyPuzzle" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>      
                    <IoCalendarClearOutline size={32} />            
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/leaderboards" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>        
                    <MobileNavbarIcon src={leaderboard}/>              
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/openings" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>             
                    <IoBookOutline size={32} />
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/profile" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                    <AiOutlineUser size={32} />
                </MobileNavbarItem>
                </MobileNavLink>
            </MobileNavbarItems>
        </MobileNavbarWrapper>

        </>
    )
}

export default MobileNabar
