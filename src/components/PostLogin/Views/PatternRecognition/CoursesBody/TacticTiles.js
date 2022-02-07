import {useRef, useEffect, useState} from 'react'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid
} from './CoursesElements'
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';
import CategoryTitle from '../../../../UI_Kit/CategoryTitle/CategoryTitle';

import useOnScreen from '../../../../Hooks/useOnScreen';

const TacticTiles = (props) => {
    console.log(props)
    const tacticRef = useRef();
    const [visible, setVisible] = useState(false);
    const load = useOnScreen(tacticRef, '0px');
    const tacticModules = Modules.filter(module => module.type === "midgame")
    
    useEffect(() => {
        if (load && !visible) {
            setVisible(true);
        }
    }, [load])


    return (
        <>
            <CoursesWrapper ref={tacticRef} id="tactics">
            {visible && <>
                <CategoryTitle>
                    Tactics
                </CategoryTitle>
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
                </>}
            </CoursesWrapper>
        </>
    )
}

export default TacticTiles
