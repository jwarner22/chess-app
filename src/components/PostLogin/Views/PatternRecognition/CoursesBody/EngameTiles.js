import React from 'react'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid
} from './CoursesElements';
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';



const EngameTiles = (props) => {

    const endgameModules = Modules.filter(module => module.type === "endgame")

    return (
        <>
        <CoursesWrapper >
            <ModuleWrapper>
                <ModuleGrid>
                    {endgameModules.map((module, index) => {
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

export default EngameTiles
