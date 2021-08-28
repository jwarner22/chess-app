import React from 'react'
import {Link} from 'react-router-dom'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid, 
    CategoryLabel,
    CategoryLabelWrapper,
    CategoryLabelContainer,
    CategoryLabelContainerTop
} from './CoursesElements'
import CourseTile from './CourseTile/Index'
import {Modules} from './CourseTile/Data';

const Body = (
) => {

    const endgameModules = Modules.filter(module => module.type === "endgame")
    const checkmateModules = Modules.filter(module => module.type === "checkmate")
    const tacticModules = Modules.filter(module => module.type === "midgame")

    return (
        <>
        <CategoryLabelContainerTop>
            <CategoryLabelWrapper>
                <CategoryLabel>
                    Endgames
                </CategoryLabel>
            </CategoryLabelWrapper>
        </CategoryLabelContainerTop>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {endgameModules.map((module, index) => {
                        return (
                    <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                        <CourseTile key={index} {...module}/>
                    </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        <CategoryLabelContainer>
            <CategoryLabelWrapper>
                <CategoryLabel>
                    Tactics
                </CategoryLabel>
            </CategoryLabelWrapper>
        </CategoryLabelContainer>
        <CoursesWrapper >
            <ModuleWrapper>
                <ModuleGrid>
                    {tacticModules.map((module, index) => {
                        return(
                        <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                        <CourseTile key={index} {...module} />
                        </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        <CategoryLabelContainer>
            <CategoryLabelWrapper>
                <CategoryLabel>
                    Checkmates
                </CategoryLabel>
            </CategoryLabelWrapper>
        </CategoryLabelContainer>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {checkmateModules.map((module, index) => {
                        return (
                    <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                        <CourseTile key={index} {...module}/>
                    </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </>
    )
}

export default Body
