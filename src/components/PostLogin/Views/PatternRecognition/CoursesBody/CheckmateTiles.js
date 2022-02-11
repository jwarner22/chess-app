import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid
} from './CoursesElements'
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';
import CategoryTitle from '../../../../UI_Kit/CategoryTitle/CategoryTitle';

const CheckmateTiles = () => {
    const checkmateModules = Modules.filter(module => module.type === "checkmate")

    return (
        <>
            <CoursesWrapper id="checkmates">
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
        </CoursesWrapper>

        </>
    )
}

export default CheckmateTiles
