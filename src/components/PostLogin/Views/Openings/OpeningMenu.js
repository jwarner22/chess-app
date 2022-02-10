import React from 'react';
import MenuTile from '../../../UI_Kit/PuzzleMenu/MenuTile';
import { MenuWrapper } from '../../../UI_Kit/PuzzleMenu/MenuTileElements';
import { MenuGrid } from '../PatternRecognition/CoursesBody/CoursesElements';

const OpeningMenu = (props) => {
  return <MenuWrapper>
      <MenuGrid className='menuGrid'>
            <MenuTile
                categoryTitle={"E4"}
                shadow={'0px 5px 8px rgba(248, 92, 55, 0.25)'}
                activeShadow={'0px 5px 8px rgba(248, 92, 55, 0.75)'} />
            <MenuTile 
                categoryTitle={"C4"}
                shadow={'0px 5px 8px rgba(248, 92, 55, 0.25)'}
                activeShadow={'0px 5px 8px rgba(248, 92, 55, 0.75)'}
            />
            <MenuTile 
                categoryTitle={"D4"}
                shadow={'0px 5px 8px rgba(248, 92, 55, 0.25)'}
                activeShadow={'0px 5px 8px rgba(248, 92, 55, 0.75)'}
            />
      </MenuGrid>
  </MenuWrapper>;
};

export default OpeningMenu;
