import {
    AnnouncementContainerWrapper, 
    AnnouncementContainer, 
    AnnouncementTitleH1, 
    AnnouncementWrapper, 
    AnnouncementP,
    ButtonWrapper,
    CalendarWrapper,
    CalendarTitle
} from "./AnnouncementsElements"
import React from 'react'
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
        //Need to add dynamic elements to this component and change the calendar to a list
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
                        
                        <CalendarTitle>
                    0 of 7 days complete
                </CalendarTitle>
                        <CalendarWrapper>
                        {CalendarData.map((module, index) => {
            return (
                        <Calendar key={index} {...module}/>
            )})}
                        </CalendarWrapper>
                    </AnnouncementContainer>
                </AnnouncementContainerWrapper>
            </AnnouncementWrapper>
        </>
    )
}

export default Announcements
