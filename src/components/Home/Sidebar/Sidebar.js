import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute, SidebarLinkRouter} from './SidebarElements'

const Sidebar = ({ isOpen, toggle}) => {
    return (
        <>
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWapper>
                    <SidebarMenu>
                        <SidebarLink to='/about' onClick={toggle}>
                            About
                        </SidebarLink>
                        <SidebarLink to='/discover' onClick={toggle}>
                            Pattern Recognition
                        </SidebarLink>
                        <SidebarLink to='/services' onClick={toggle}>
                            Daily Workouts
                        </SidebarLink>
                        <SidebarLinkRouter to='/support'>
                            Support
                        </SidebarLinkRouter>
                    </SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRoute to='/login'>Login</SidebarRoute>
                        <SidebarRoute to='/signup'>Sign Up</SidebarRoute>
                    </SideBtnWrap>
                </SidebarWapper>
            </SidebarContainer>
        </>
    )
}

export default Sidebar
