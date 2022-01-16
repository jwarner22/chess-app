import React from 'react'
import {PageHeaderContainer, PageHeaderTitle, SettingsIcon, SettingsIconWrapper} from "./PageHeaderElements"
import settings from "../../Images/settings.png"

const PageHeader = (props) => {
    
    const isProfile = props.pageTitle == "Profile"
    
    return (
        <PageHeaderContainer>
            <PageHeaderTitle>
                {props.pageTitle}
            </PageHeaderTitle>
            {isProfile ?    
            (<SettingsIconWrapper>
                <SettingsIcon src={settings}/>
            </SettingsIconWrapper>) : (
                null
            )}

        </PageHeaderContainer>
    )
}

export default PageHeader
