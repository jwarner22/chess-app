import React, {useEffect, useState} from 'react';
import MenuTile from '../../../UI_Kit/PuzzleMenu/MenuTile';
import { MenuWrapper } from '../../../UI_Kit/PuzzleMenu/MenuTileElements';
import { MenuGrid } from '../PatternRecognition/CoursesBody/CoursesElements';
import { Link as LinkS } from "react-scroll"
import {animateScroll as scroll} from 'react-scroll'

const OpeningMenu = (props) => {

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

  return <MenuWrapper>
            <MenuGrid className='menuGrid'>
                <MenuTile
                    categoryTitle={"E4"}
                    shadow={'0px 5px 8px rgba(248, 92, 55, 0.25)'}
                    activeShadow={'0px 5px 8px rgba(248, 92, 55, 0.75)'}
                    scrollTo={"e4"} 
                    />
                <MenuTile 
                    categoryTitle={"D4"}
                    shadow={'0px 5px 8px rgba(248, 92, 55, 0.25)'}
                    activeShadow={'0px 5px 8px rgba(248, 92, 55, 0.75)'}
                    scrollTo={"d4"} 
                />
                <MenuTile 
                    categoryTitle={"C4"}
                    shadow={'0px 5px 8px rgba(248, 92, 55, 0.25)'}
                    activeShadow={'0px 5px 8px rgba(248, 92, 55, 0.75)'}
                    scrollTo={"c4"} 
                />
            </MenuGrid>
  </MenuWrapper>;
};

export default OpeningMenu;
