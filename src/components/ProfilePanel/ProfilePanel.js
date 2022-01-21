import {Link} from 'react-router-dom'
import {ProfilePanelContainer,
    ProfilePanelUsernameWrapper,
ProfilePanelWrapper,
ProfilePanelContent,
ProfilePanelButton,
CalendarTitleWrapper,
CalendarTitle,
ProfilePanelImageContainer,
ProfilePagePlaceholder,
ClockIcon
} from "./ProfilePanelElements"
import placeholder from "../../Images/user.png"
import clock from "../../Images/clockSVG.svg"

const ProfilePanel = (props) => {

    return (
        <>
          <ProfilePanelContainer>
              <ProfilePanelWrapper>
                  <ProfilePanelContent>
                  <ProfilePanelUsernameWrapper>
                      {props.username}
                  </ProfilePanelUsernameWrapper>
                  <Link to='/dailyPuzzle'>
                  <ProfilePanelButton>
                      Todays Workout
                  </ProfilePanelButton>
                  </Link>
                  <CalendarTitleWrapper>
                      <CalendarTitle>
                          <ClockIcon src={clock}/>
                          Joined {props.joinDate}
                      </CalendarTitle>
                  </CalendarTitleWrapper>
                  </ProfilePanelContent>
                  {/* <CalendarBackgroundWrapper>
                     <CalendarBackground>
                          <CalendarGrid>
                              <CalendarDay>
                                  S
                              </CalendarDay>
                          </CalendarGrid>
                    </CalendarBackground>
                    </CalendarBackgroundWrapper> */}
                    <ProfilePanelImageContainer>
                        <ProfilePagePlaceholder src={[placeholder]}/>
                    </ProfilePanelImageContainer >
              </ProfilePanelWrapper>
        </ProfilePanelContainer>  
        </>
    )
}

export default ProfilePanel
