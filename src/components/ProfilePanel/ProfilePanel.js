import React from 'react'
import {ProfilePanelContainer,
    ProfilePanelImgWrapper,
ProfilePanelWrapper,
ProfilePanelHeader
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
                  <ProfilePanelImgWrapper>
                  </ProfilePanelImgWrapper>
              </ProfilePanelWrapper>
        </ProfilePanelContainer>  
        </>
    )
}

export default ProfilePanel
