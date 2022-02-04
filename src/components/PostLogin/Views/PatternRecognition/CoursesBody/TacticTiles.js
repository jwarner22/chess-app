import React from 'react'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid
} from './CoursesElements'
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';

const TacticTiles = (props) => {

    const tacticModules = Modules.filter(module => module.type === "midgame")

    return (
        <>
            <CoursesWrapper id="tactics">
                <ModuleWrapper>
                    <ModuleGrid>
                        {tacticModules.map((module, index) => {
                            return(
                            // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                            <CourseTile key={index} {...module} />
                            // </ModalLink>
                        )})}
                    </ModuleGrid>
                </ModuleWrapper>
            </CoursesWrapper>
            
        </>
    )
}

export default TacticTiles
