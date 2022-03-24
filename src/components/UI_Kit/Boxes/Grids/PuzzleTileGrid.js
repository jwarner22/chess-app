import React from 'react'
import CategoryTitle from '../../CategoryTitle/CategoryTitle'
import { CoursesWrapper, ModuleGrid, ModuleWrapper } from './PuzzleTileGridElements'
import {motion} from 'framer-motion'


//id is the identifier for the scroll. Map the tile categories to the children. 
const PuzzleTileGrid = (props) => {

  return (
    <CoursesWrapper 
      id={props.id}
      as={motion.div}>
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