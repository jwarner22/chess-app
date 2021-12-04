import React from 'react'
import {Link} from 'react-router-dom'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid, 
    CategoryLabel,
    CategoryLabelWrapper,
    CategoryLabelContainer,
    TacticsLabelWrapper,
    CategoryLabelContainerTop,
    CheckmatesLabelWrapper,
    EndgamesLabelWrapper,
    MenuWrapper,
    MenuGrid,
    MenuTile
} from './CoursesElements';
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';



const EngameTiles = (props) => {

    const endgameModules = Modules.filter(module => module.type === "endgame")

    return (
        <div>
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
        </div>
    )
}

export default EngameTiles
