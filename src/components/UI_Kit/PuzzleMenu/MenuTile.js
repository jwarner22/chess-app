import React from 'react';

import {
    MenuTiles,
    MenuContent,
    MenuTitle,
    TileWrapper
} from './MenuTileElements'

//add MenuWrapper and MenuGrid in the parent component

const MenuTile = (props) => {
  return (<> 
            <TileWrapper>
                <MenuTiles 
                    to={props.scrollTo} 
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    activeClass='active'
                    offset={-160}
                    shadow={props.shadow}
                    activeShadow={props.activeShadow}
                            >
                    <MenuContent>
                            {props.children}
                        <MenuTitle textColor={props.textColor}>
                            {props.categoryTitle}
                        </MenuTitle>
                    </MenuContent>
                </MenuTiles>
            </TileWrapper>
</>
  )};

export default MenuTile;
