import React from 'react'
import { IoCalendarClearOutline } from "react-icons/io5"
import { IoBookOutline } from "react-icons/io5"
import { AiOutlineUser } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import {MobileNavbarWrapper, 
    MobileNavbarItems, 
    MobileNavbarItem, 
    MobileNavbarIcon, 
    MobileNavLink    
} from "./MobileNabarElements"
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
                        <IoExtensionPuzzleOutline size={45} />                  
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/dailyPuzzle" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>      
                    <IoCalendarClearOutline size={45} />            
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
                    <IoBookOutline size={45} />
                </MobileNavbarItem>
                </MobileNavLink>
                <MobileNavLink to="/profile" activeStyle={{
                    color:'#F4B062',
                    fontWeight: "bold"
                }}>
                <MobileNavbarItem>
                    <AiOutlineUser size={45} />
                </MobileNavbarItem>
                </MobileNavLink>
            </MobileNavbarItems>
        </MobileNavbarWrapper>

        </>
    )
}

export default MobileNabar
