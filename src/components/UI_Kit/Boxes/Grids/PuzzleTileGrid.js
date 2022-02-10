import React from 'react'
import CategoryTitle from '../../CategoryTitle/CategoryTitle'
import { CoursesWrapper, ModuleGrid, ModuleWrapper } from './PuzzleTileGridElements'


//id is the identifier for the scroll. Map the tile categories to the children. 
const PuzzleTileGrid = (props) => {
  return (
    <CoursesWrapper id={props.id}>
        <CategoryTitle>
            {props.category}
        </CategoryTitle>
        <ModuleWrapper>
            <ModuleGrid>
                {props.children}
            </ModuleGrid>
        </ModuleWrapper>
    </CoursesWrapper>
  )
}

export default PuzzleTileGrid