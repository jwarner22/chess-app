import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ProfilePanelContainer,
    ProfilePanelUsernameWrapper,
ProfilePanelWrapper,
ProfilePanelHeader,
ProfilePanelContent,
ProfilePanelButton,
CalendarTitleWrapper,
CalendarTitle,
CalendarBackgroundWrapper,
CalendarBackground,
CalendarGrid,
CalendarDay,
PageBodyContainer
} from "./ProfilePanelElements"
import { CgProfile } from "react-icons/cg";

const ProfilePanel = () => {

    return (
        <>
        <ProfilePanelHeader>
            Profile
        </ProfilePanelHeader>
          {/* <ProfilePanelContainer>
              <ProfilePanelWrapper>
                  <ProfilePanelContent>
                  <ProfilePanelUsernameWrapper>
                      CalebGibson21
                  </ProfilePanelUsernameWrapper>
                  <Link to='/dailyPuzzle'>
                  <ProfilePanelButton>
                      Todays Workout
                  </ProfilePanelButton>
                  </Link>
                  <CalendarTitleWrapper>
                      <CalendarTitle>
                          Daily Streak: 2
                      </CalendarTitle>
                  </CalendarTitleWrapper>
                  </ProfilePanelContent>
                  <CalendarBackgroundWrapper>
                     <CalendarBackground>
                          <CalendarGrid>
                              <CalendarDay>
                                  S
                              </CalendarDay>
                          </CalendarGrid>
                    </CalendarBackground>
                    </CalendarBackgroundWrapper>
              </ProfilePanelWrapper>
        </ProfilePanelContainer>   */}
        </>
    )
}

export default ProfilePanel
