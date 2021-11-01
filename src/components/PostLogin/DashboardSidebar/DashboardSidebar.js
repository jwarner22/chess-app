import React, {useContext} from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './DashSidebarElements'
import firebaseConfig from "../../../config"
import firebase from 'firebase'
require('firebase/auth')

const DashSidebar = ({ isOpen, toggle}) => {

        //const Auth = useContext(AuthContext)
    const handleLogout = () => {
        firebase.auth().signOut()
  .then(res => {
    // Sign-out successful.
  })
  .catch(function(error) {
    // An error happened
  });
    }
    return (
        <>
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWapper>
                    <SidebarMenu>
                        <SidebarLink to='/dailyPuzzle' onClick={toggle}>
                            Today
                        </SidebarLink>
                        <SidebarLink to='/dashboard' onClick={toggle}>
                            Pattern Recognition
                        </SidebarLink>
                        <SidebarLink to='/openings' onClick={toggle}>
                            Openings
                        </SidebarLink>
                        <SidebarLink to='/profile' onClick={toggle}>
                            Profile
                        </SidebarLink>
                    </SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRoute to='/login' onClick={() => handleLogout()}>Log out</SidebarRoute>
                    </SideBtnWrap>
                </SidebarWapper>
            </SidebarContainer>
        </>
    )
}

export default DashSidebar
