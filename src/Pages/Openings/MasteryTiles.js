import React from 'react'
import Tile from '../../components/UI_Kit/Tiles/Tile'
import MasteryTilesContent from './MasteryTilesContent'

const MasteryTiles = (props) => {
  return (
    <Tile>
        <MasteryTilesContent>
            {props.children}
        </MasteryTilesContent>
    </Tile>
  )
}

export default MasteryTiles