import React from 'react'
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
CalendarDay
} from "./ProfilePanelElements"
import { CgProfile } from "react-icons/cg";

const ProfilePanel = () => {
    return (
        <>
        <ProfilePanelHeader>
            Profile
        </ProfilePanelHeader>
          <ProfilePanelContainer>
              <ProfilePanelWrapper>
                  <ProfilePanelContent>
                  <ProfilePanelUsernameWrapper>
                      CalebGibson21
                  </ProfilePanelUsernameWrapper>
                  <ProfilePanelButton>
                      Todays Workout
                  </ProfilePanelButton>
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
                                  M
                              </CalendarDay>
                          </CalendarGrid>
                    </CalendarBackground>
                    </CalendarBackgroundWrapper>
              </ProfilePanelWrapper>
        </ProfilePanelContainer>  
        </>
    )
}

export default ProfilePanel
