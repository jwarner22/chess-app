import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './DashSidebarElements'

const DashSidebar = ({ isOpen, toggle}) => {
    return (
        <>
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWapper>
                    <SidebarMenu>
                        <SidebarLink to='about' onClick={toggle}>
                            About
                        </SidebarLink>
                        <SidebarLink to='discover' onClick={toggle}>
                            Discover
                        </SidebarLink>
                        <SidebarLink to='services' onClick={toggle}>
                            Services
                        </SidebarLink>
                    </SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRoute to='/login'>Log In</SidebarRoute>
                        <SidebarRoute to='/signup'>Sign Up</SidebarRoute>
                    </SideBtnWrap>
                </SidebarWapper>
            </SidebarContainer>
        </>
    )
}

export default DashSidebar
