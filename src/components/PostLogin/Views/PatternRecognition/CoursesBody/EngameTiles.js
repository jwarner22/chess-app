import {useRef} from 'react'
import {CoursesWrapper, 
    ModuleWrapper, 
    ModuleGrid
} from './CoursesElements';
import CourseTile from '../CourseTiles/CourseTiles'
import {Modules} from '../CourseTiles/Data';
import CategoryTitle from '../../../../UI_Kit/CategoryTitle/CategoryTitle';
//import useOnScreen from '../../../../Hooks/useOnScreen';

//CONDENSED INTO PUZZLEGRID.JS

// const EndgameTiles = (props) => {
//     //const endgameRef = useRef();
//     //const visible = useOnScreen(endgameRef, '-100px');
//     const endgameModules = Modules.filter(module => module.type === "endgame")

//     return (
//         <>
//         <CoursesWrapper id="endgames">
//         {/* {visible && <> */}
//             <CategoryTitle>
//                 Endgames
//             </CategoryTitle>
//             <ModuleWrapper>
//                 <ModuleGrid>
//                     {endgameModules.map((module, index) => {
//                         return(
//                         // <ModalLink key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
//                         <CourseTile key={index} {...module} />
//                         // </ModalLink>
//                     )})}
//                 </ModuleGrid>
//             </ModuleWrapper>
//             {/* </>} */}
//         </CoursesWrapper>
//         </>
//     )
// }

// export default EndgameTiles
