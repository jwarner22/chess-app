import React from 'react'
import {Link} from 'react-router-dom'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid, 
    Course, 
    CourseHeadline, 
    CategoryLabel,
    CategoryLabelWrapper
} from './CoursesElements'
import { Module1, Module2 } from './CourseTile/Data'
import CourseTile from './CourseTile/Index'
import {Modules} from './CourseTile/Data';
import { AnnouncementContainer } from '../Announcements/AnnouncementsElements'

const Body = (
) => {

    console.log(Modules);
    return (
        <>
        <CategoryLabelWrapper>
            <CategoryLabel>
                Openings
            </CategoryLabel>
        </CategoryLabelWrapper>
        <CoursesWrapper>
            <ModuleWrapper>
                <ModuleGrid>
                    {Modules.map((module, index) => {
                        return(
                        <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                        <CourseTile key={index} {...module} />
                        </Link>
                    )})}
                </ModuleGrid>
            </ModuleWrapper>
        </CoursesWrapper>
        </>
    )
}

export default Body
