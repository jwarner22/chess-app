import React, {useState, useEffect} from 'react';
import MenuTile from '../../../../UI_Kit/PuzzleMenu/MenuTile';
import styled from 'styled-components'
import { Link as LinkS } from "react-scroll"
import {animateScroll as scroll} from 'react-scroll'
import { MenuGrid, 
    MenuWrapper } from '../../../../UI_Kit/PuzzleMenu/MenuTileElements';
import {ReactComponent as Endgame} from "../../../../../Images/kingIconBlue.svg";
import {ReactComponent as Tactic} from "../../../../../Images/TacticsIconBlue.svg";
import {ReactComponent as Checkmate} from "../../../../../Images/checkmateIconBlue.svg";
    

const MotifMenu = (props) => {
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
        return () => window.removeEventListener('scroll', changeNav)
    }, []);

  
  return <>
    <MenuWrapper scrollNav={scrollNav}>
        <MenuGrid className="menuGrid">
            <MenuTile 
            tileImage={props.endgameImg} 
            categoryTitle={"Endgames"}
            scrollTo={"endgames"}
            textColor={'#A347B5'}
            >
                <EndgameIcon />
            </MenuTile>
            <MenuTile 
            tileImage={props.tacticsImg} 
            categoryTitle={"Tactics"}
            scrollTo={"tactics"}
            textColor={'#FF8B59'}
            >
                <TacticIcon />
            </MenuTile>
            <MenuTile 
            tileImage={props.checkmateImg} 
            categoryTitle={"Checkmates"}
            scrollTo={"checkmates"}
            textColor={'#6344F8'}
            >
                <CheckmateIcon />
            </MenuTile>
        </MenuGrid>
    </MenuWrapper>
  </>;
};

export default MotifMenu;


const EndgameIcon = styled(Endgame)`
    width: 100%;
    height: 100%;
    padding-top: 8px;
    fill: #A347B5;
`
const TacticIcon = styled(Tactic)`
    width: 100%;
    height: 100%;
    padding-top: 8px;
    fill: #FF8B59;
`
const CheckmateIcon = styled(Checkmate)`
    width: 100%;
    height: 100%;
    padding-top: 8px;
    fill: #6344F8;
`