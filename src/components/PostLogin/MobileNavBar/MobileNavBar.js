import React from 'react'
import {FaChessPawn} from "react-icons/fa"
import {NavLink} from "react-router-dom"
import { RiHome3Fill } from "react-icons/ri"
import { FcPuzzle } from "react-icons/fc"
import { CgProfile } from "react-icons/cg";
import {Container} from '../../DailyPuzzle/DailyPuzzleElements'
import {MobileNavbarWrapper, 
    MobileNavbarItems, 
    MobileNavbarItem, 
    MobileNavbarIcon, 
    Styles,
    MobileNavLink    
} from "./MobileNabarElements"
import { BlueBars } from '../DashboardNavbar/DashboardNavElements'


const MobileNabar = () => {
    return (
        <>
        {/* <MobileNavbarWrapper> */}
            <MobileNavbarItems>
                <MobileNavLink to="/dashboard" activeStyle={{
                    background:'#2170D9',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <RiHome3Fill size={16} />
                </span>
                Home
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/dailyPuzzle" activeStyle={{
                    background:'#2170D9',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <FcPuzzle size={16} />
                </span>
                Puzzles
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/openings" activeStyle={{
                    background:'#2170D9',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <FaChessPawn size={16} />
                </span>
                Openings
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/profile" activeStyle={{
                    background:'#2170D9',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                <span>
                    <CgProfile size={16} />
                </span>
                Profile
                </MobileNavbarItem>
                </MobileNavLink>
            </MobileNavbarItems>
        {/* </MobileNavbarWrapper> */}

        </>
    )
}

export default MobileNabar
