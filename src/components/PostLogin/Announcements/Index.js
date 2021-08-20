import {MainDiv, 
    AnnouncementContainerWrapper, 
    AnnouncementContainer, 
    CourseContent, 
    AnnouncementTitleH1, 
    AnnouncementWrapper, 
    AnnouncementP,
    CoursesWrapper,
    ModuleWrapper,
    ModuleGrid,
    ButtonWrapper,
    ProgressBarWrapper
} from "./AnnouncementsElements"
// import firebaseConfig from "../../../config";
import React, {useContext} from 'react'
import { Link } from "react-router-dom";
//import { AuthContext } from "../../Auth";
import CourseList from '../CoursesBody/Index'
import {Module1} from "../CoursesBody/CourseTile/Data"
import {Button} from "../../ButtonElement"


const Announcements = ({username, subheadline}) => {


//Backup Firebase login auth

//     const { currentUser } = useContext(AuthContext);
//   if (!currentUser) {
//     return <Redirect to="/login" />; 
//   }


    return (
        <>
            <AnnouncementWrapper>
                <AnnouncementContainerWrapper>
                    <AnnouncementContainer>  
                        <AnnouncementTitleH1> 
                            {username}
                        </AnnouncementTitleH1>
                        <AnnouncementP>
                            {subheadline}
                        </AnnouncementP>
                        <ButtonWrapper>
                        <Button
                        primary="true"
                        to="dailyPuzzle"
                        >Daily Puzzles</Button>
                        </ButtonWrapper>
                        <ProgressBarWrapper>
                            Progress Bar Here
                        </ProgressBarWrapper>
                    </AnnouncementContainer>
                </AnnouncementContainerWrapper>
            </AnnouncementWrapper>
        </>
    )
}

export default Announcements
