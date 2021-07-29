import React from 'react'
import {CoursesWrapper, ModuleWrapper, ModuleGrid, Course, CourseHeadline} from './CoursesElements'
import { Module1, Module2 } from './CourseTile/Data'
import CourseTile from './CourseTile/Index'


const Body = (
) => {


    return (
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    <CourseTile {...Module1} />
                    <CourseTile {...Module2} />
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
    )
}

export default Body
