import React from 'react';

import {
    MenuWrapper,
    MenuGrid,
    MenuTiles,
    MenuContent,
    MenuTitle,
    MenuImg,
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
                            >
                    <MenuContent>
                        <MenuImg src={props.tileImage}/>
                        <MenuTitle>
                            {props.categoryTitle}
                        </MenuTitle>
                    </MenuContent>
                </MenuTiles>
            </TileWrapper>
</>
  )};

export default MenuTile;
