import React from 'react'
import { IoCalendar } from "@react-icons/all-files/io5/IoCalendar"
import {  IoRibbonSharp } from "@react-icons/all-files/io5/IoRibbonSharp";
import { HiPuzzle } from "@react-icons/all-files/hi/HiPuzzle";
import { FaBookOpen } from "@react-icons/all-files/fa/FaBookOpen";
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import {MobileNavbarWrapper, 
    MobileNavLink,    
    NavItemTitle
} from "./MobileNabarElements"


const MobileNavbar = () => {

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

export default MobileNavbar
