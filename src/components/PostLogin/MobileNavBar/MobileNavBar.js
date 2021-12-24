import React from 'react'
import {BiDoorOpen} from "react-icons/bi"
import {NavLink} from "react-router-dom"
import { BiBrain } from "react-icons/bi"
import { IoCalendarClearOutline } from "react-icons/io5"
import { AiOutlineUser } from "react-icons/ai";
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
                <span>
                    <BiBrain size={24} />
                </span>
                Patterns
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/dailyPuzzle" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <IoCalendarClearOutline size={24} />
                </span>
                Today
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/leaderboards" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <MobileNavbarIcon src={leaderboard}/>
                </span>
                Leaderboards
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/openings" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <BiDoorOpen size={24} />
                </span>
                Openings
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/profile" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <AiOutlineUser size={24} />
                </span>
                Profile
                </MobileNavbarItem>
                </MobileNavLink>
            </MobileNavbarItems>
        </MobileNavbarWrapper>

        </>
    )
}

export default MobileNabar
