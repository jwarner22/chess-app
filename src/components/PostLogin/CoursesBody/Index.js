import React from 'react'
import {Link} from 'react-router-dom'
import {CoursesWrapper, ModuleWrapper, ModuleGrid, Course, CourseHeadline} from './CoursesElements'
import { Module1, Module2 } from './CourseTile/Data'
import CourseTile from './CourseTile/Index'
import {Modules} from './CourseTile/Data';

const Body = (
) => {

    console.log(Modules);
    return (
        <Link to={{pathname: '/dashboard/module', state: {text: 'passed props'}}}>
        <button>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {Modules.map(module => {
                        return(
                        <Link to={{pathname: '/dashboard/module', state: {type: module.type}}}>
                        <CourseTile {...module} />
                        </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </button>
        </Link>
    )
}

export default Body
