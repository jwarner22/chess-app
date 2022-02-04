import React, {useState, useEffect} from 'react';
import MenuTile from '../../../../UI_Kit/PuzzleMenu/MenuTile';
import styled from 'styled-components'
import { Link as LinkS } from "react-scroll"
import {animateScroll as scroll} from 'react-scroll'
import { MenuGrid, 
    MenuWrapper } from '../../../../UI_Kit/PuzzleMenu/MenuTileElements';

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
            scrollTo={"endgames"}/>
            <MenuTile 
            tileImage={props.tacticsImg} 
            categoryTitle={"Tactics"}
            scrollTo={"tactics"}
            />
            <MenuTile 
            tileImage={props.checkmateImg} 
            categoryTitle={"Checkmates"}
            scrollTo={"checkmates"}/>
        </MenuGrid>
    </MenuWrapper>
  </>;
};

export default MotifMenu;


