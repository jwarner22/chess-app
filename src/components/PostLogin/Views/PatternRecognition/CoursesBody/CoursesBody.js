import React from 'react'
import styled from "styled-components"
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
} from './CoursesElements'
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';

const Body = (
) => {

    const endgameModules = Modules.filter(module => module.type === "endgame")
    const checkmateModules = Modules.filter(module => module.type === "checkmate")
    const tacticModules = Modules.filter(module => module.type === "midgame")

    return (
        <>
        <div>
        <CategoryLabelContainer>
            <EndgamesLabelWrapper>
                <CategoryLabel>
                    Endgames
                </CategoryLabel>
            </EndgamesLabelWrapper>
        </CategoryLabelContainer>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {endgameModules.map((module, index) => {
                        return (
                    // <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}, isDaily: false}}>
                        <CourseTile key={index} {...module}/>
                    // </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </div>
        <div>
        <CategoryLabelContainer>
            <TacticsLabelWrapper>
                <CategoryLabel>
                    Tactics
                </CategoryLabel>
            </TacticsLabelWrapper>
        </CategoryLabelContainer>
        <CoursesWrapper >
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
        </div>
        <CategoryLabelContainer>
            <CheckmatesLabelWrapper>
                <CategoryLabel>
                    Checkmates
                </CategoryLabel>
            </CheckmatesLabelWrapper>
        </CategoryLabelContainer>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {checkmateModules.map((module, index) => {
                        return (
                    // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                        <CourseTile key={index} {...module}/>
                    // </ModalLink>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </>
    )
}

export default Body

const ModalLink = styled(Link)`
    position: relative;
    z-index: 10;
`