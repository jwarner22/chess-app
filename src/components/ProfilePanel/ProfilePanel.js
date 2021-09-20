import React, {useState, useEffect} from 'react'
import {ProfilePanelContainer,
    ProfilePanelUsernameWrapper,
ProfilePanelWrapper,
ProfilePanelHeader,
ProfilePanelContent
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
                  </ProfilePanelContent>
              </ProfilePanelWrapper>
        </ProfilePanelContainer>  
        </>
    )
}

export default ProfilePanel
