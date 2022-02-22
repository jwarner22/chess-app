import React from 'react'
import {Link} from 'react-router-dom'
import {PageHeaderContainer, PageHeaderTitle, SettingsIcon, SettingsIconWrapper} from "./PageHeaderElements"
import settings from "../../Images/settings.png"

const PageHeader = (props) => {
    
    const isProfile = props.pageTitle === "Profile"
    
    return (
        <PageHeaderContainer>
            <PageHeaderTitle>
                {props.pageTitle}
            </PageHeaderTitle>
            {isProfile ?    
            (<SettingsIconWrapper>
                <Link to="settings">
                <SettingsIcon src={settings}/>
                </Link>
            </SettingsIconWrapper>
            ) : (
                null
            )}

        </PageHeaderContainer>
    )
}

export default PageHeader
