import React from 'react'
import { IoCalendarClearOutline } from "react-icons/io5"
import { IoBookOutline,IoCalendar } from "react-icons/io5"
import { AiOutlineUser } from "react-icons/ai";
import { IoExtensionPuzzleOutline, IoRibbonSharp } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { HiPuzzle } from "react-icons/hi";
import { FaBookOpen,FaUser } from "react-icons/fa";
import { BsFillCalendar3Fill } from "react-icons/bs";
import {MobileNavbarWrapper, 
    MobileNavbarItems,  
    MobileNavbarItem, 
    MobileNavbarIcon, 
    MobileNavLink,    
    CenterIcon,
    NavItemTitle
} from "./MobileNabarElements"




const MobileNabar = () => {

    const style = {
        paddingBottom: "10px"
    }

    return (
        <>
        <MobileNavbarWrapper>
                <MobileNavLink to="/home/daily">
                <IoCalendar size={36} style={style} ></IoCalendar>
                           Daily          
                </MobileNavLink>
                <MobileNavLink to="/home/practice">             
                        <HiPuzzle size={36} /> 
                        <NavItemTitle>
                            Puzzles
                        </NavItemTitle>
                </MobileNavLink>
                    <MobileNavLink to="/home/openings">            
                        <FaBookOpen size={36} />
                        <NavItemTitle>
                            Openings
                        </NavItemTitle>
                </MobileNavLink>
                <MobileNavLink to="/home/leaderboards">       
                        <IoRibbonSharp size={36} />
                        <NavItemTitle>
                            Leaderboard  
                        </NavItemTitle>   
                </MobileNavLink>        
                <MobileNavLink to="/home/profile">
                        <FaUser size={36} />
                        <NavItemTitle>
                            Profile
                        </NavItemTitle>
                </MobileNavLink>
        </MobileNavbarWrapper>

        </>
    )
}

export default MobileNabar
