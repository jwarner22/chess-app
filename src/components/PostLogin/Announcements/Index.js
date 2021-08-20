import {
    AnnouncementContainerWrapper, 
    AnnouncementContainer, 
    AnnouncementTitleH1, 
    AnnouncementWrapper, 
    AnnouncementP,
    ButtonWrapper,
    CalendarWrapper
} from "./AnnouncementsElements"
// import firebaseConfig from "../../../config";
import React, {useContext} from 'react'
import { Link } from "react-router-dom";
//import { AuthContext } from "../../Auth";
import CourseList from '../CoursesBody/Index'
import {Module1} from "../CoursesBody/CourseTile/Data"
import {Button} from "../../ButtonElement"
import Calendar from "./Calendar"
import { CalendarData } from "./Data"


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
                        <CalendarWrapper>
                        {CalendarData.map((module, index) => {
            return (
                        <Calendar key={index} {...module}/>
            )})};
                        </CalendarWrapper>
                    </AnnouncementContainer>
                </AnnouncementContainerWrapper>
            </AnnouncementWrapper>
        </>
    )
}

export default Announcements
