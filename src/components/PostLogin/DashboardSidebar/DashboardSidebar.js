import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './DashSidebarElements'
import firebase from 'firebase/compat/app'
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
                        <SidebarLink to='/home/daily' onClick={toggle}>
                            Today
                        </SidebarLink>
                        <SidebarLink to='/home/practice' onClick={toggle}>
                            Pattern Recognition
                        </SidebarLink>
                        <SidebarLink to='/home/openings' onClick={toggle}>
                            Openings
                        </SidebarLink>
                        <SidebarLink to='/home/profile' onClick={toggle}>
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
