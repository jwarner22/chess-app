import React from 'react'
import {Link} from 'react-router-dom'
import {CoursesWrapper, ModuleWrapper, ModuleGrid, Course, CourseHeadline} from './CoursesElements'
import { Module1, Module2 } from './CourseTile/Data'
import CourseTile from './CourseTile/Index'


const Body = (
) => {


    return (
        <Link to={{pathname: '/dashboard/module', state: {text: 'passed props'}}}>
        <button>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    <CourseTile {...Module1} />
                    <CourseTile {...Module2} />
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </button>
        </Link>
    )
}

export default Body
