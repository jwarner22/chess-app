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
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {Modules.map(module => {
                        return(
                        <button>
                        <Link style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {type: module.type}}}>
                        <CourseTile {...module} />
                        </Link>
                        </button>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
    )
}

export default Body
