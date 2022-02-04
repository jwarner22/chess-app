import React, {useRef} from 'react'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid
} from './CoursesElements'
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';
import CategoryTitle from '../../../../UI_Kit/CategoryTitle/CategoryTitle';

import useOnScreen from '../../../../Hooks/useOnScreen';

const CheckmateTiles = () => {
    const checkmateRef = useRef();
    const visible = useOnScreen(checkmateRef, '-100px');
    const checkmateModules = Modules.filter(module => module.type === "checkmate")
    
    return (
        <>
            <CoursesWrapper ref={checkmateRef} id="checkmates">
            {visible && <>
                <CategoryTitle>
                    Checkmates
                </CategoryTitle>
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
            </>}
        </CoursesWrapper>

        </>
    )
}

export default CheckmateTiles
