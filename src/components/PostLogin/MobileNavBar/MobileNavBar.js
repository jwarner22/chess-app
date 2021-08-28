import React from 'react'
import {FaChessPawn} from "react-icons/fa"
import { RiHome3Fill } from "react-icons/ri"
import { FcPuzzle } from "react-icons/fc"
import {Container} from '../../DailyPuzzle/DailyPuzzleElements'
import {MobileNavbarWrapper, MobileNavbarItems, MobileNavbarItem, MobileNavbarIcon, Styles} from "./MobileNabarElements"


const MobileNabarElements = () => {
    return (
        <>
        <MobileNavbarWrapper>
            <MobileNavbarItems>
                <MobileNavbarItem>
                <span>
                    <RiHome3Fill size={16} />
                </span>
                Home
                </MobileNavbarItem>
                <MobileNavbarItem>
                <span>
                    <FcPuzzle size={16} />
                </span>
                Puzzles
                </MobileNavbarItem>
                <MobileNavbarItem>
                <span>
                    <FaChessPawn size={16} />
                </span>
                Openings
                </MobileNavbarItem>
            </MobileNavbarItems>
        </MobileNavbarWrapper>

        </>
    )
}

export default MobileNabarElements
