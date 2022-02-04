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
            textColor={'#00a6a6'}
            shadow={'0px 5px 8px rgba(0,166,166, 0.25)'}
            activeShadow={'0px 5px 8px rgba(0,166,166, 0.75)'}>
                <EndgameIcon />
            </MenuTile>
            <MenuTile 
            tileImage={props.tacticsImg} 
            categoryTitle={"Tactics"}
            scrollTo={"tactics"}
            textColor={'#ff5074'}
            shadow={'0px 5px 8px rgba(255,80,116, 0.25)'}
            activeShadow={'0px 5px 8px rgba(255,80,116, 0.75)'}
            >
                <TacticIcon />
            </MenuTile>
            <MenuTile 
            tileImage={props.checkmateImg} 
            categoryTitle={"Checkmates"}
            scrollTo={"checkmates"}
            textColor={'#7365f1'}
            shadow={'0px 5px 8px rgba(115,101,241, 0.25)'}
            activeShadow={'0px 5px 8px rgba(115,101,241, 0.75)'}
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
    fill: #00a6a6;
`
const TacticIcon = styled(Tactic)`
    width: 100%;
    height: 100%;
    padding-top: 8px;
    fill: #ff5074;
`
const CheckmateIcon = styled(Checkmate)`
    width: 100%;
    height: 100%;
    padding-top: 8px;
    fill: #7365f1;
`