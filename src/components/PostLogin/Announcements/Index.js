import {MainDiv, 
    AnnouncementContainerWrapper, 
    AnnouncementContainer, 
    CourseContent, 
    AnnouncementTitleH1, 
    AnnouncementWrapper, 
    AnnouncementP,
    CoursesWrapper,
    ModuleWrapper,
    ModuleGrid
} from "./AnnouncementsElements"
// import firebaseConfig from "../../../config";
import React, {useContext} from 'react'
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Auth";
import CourseList from '../CoursesBody/Index'
import {Module1} from "../CoursesBody/CourseTile/Data"


const Announcements = ({headline, subheadline}) => {


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
                            {headline}
                        </AnnouncementTitleH1>
                        <AnnouncementP>
                            {subheadline}
                        </AnnouncementP>
                        {/* <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button> */}
                    </AnnouncementContainer>
                </AnnouncementContainerWrapper>
            </AnnouncementWrapper>
        </>
    )
}

export default Announcements
