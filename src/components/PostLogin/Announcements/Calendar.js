import React from 'react'
import {CalendarDays, CalendarDaysWrapper, CalendarWrapper, DaysSpanWrapper, CalendarTitle} from "./AnnouncementsElements"


const Calendar = ({title}) => {
    return (
        <>
                    <CalendarDaysWrapper>
                        <DaysSpanWrapper>
                        <CalendarDays>
                            {title}
                        </CalendarDays>
                        </DaysSpanWrapper>
                    </CalendarDaysWrapper>
        </>
    )
}

export default Calendar
