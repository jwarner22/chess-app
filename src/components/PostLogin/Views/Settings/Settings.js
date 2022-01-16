import React from 'react'
import PageHeader from '../../../PageHeaders/PageHeaders'
import { Container } from '../DailyPuzzle/DailyPuzzleElements';
import SectionHeader from "../../../SectionHeaders/SectionHeader"
import avatar from "../../../../Images/user.png"
import { AvatarContainer, AvatarImage } from './SettingsElements';



const Settings = () => {
    const pageTitle = `Settings`;

    return (
        <>
            <Container>
                <PageHeader pageTitle={pageTitle}/>
                <SectionHeader sectionTitle={'Your Profile'}>
                    Your Profile
                </SectionHeader>
                <AvatarContainer>
                    <AvatarImage src={avatar}/>
                    <div>Change Avatar</div>
                </AvatarContainer>
                <div>
                    username
                </div>
                <div>
                    Input
                </div>
                <div>
                    Password
                </div>
                <div>
                    Input
                </div>                
                <div>
                    Email
                </div>
                <div>
                    Input
                </div>
                <div>
                    Feedback Button
                </div>
                <div>
                    signout button
                </div>
            </Container>
        </>
    )
}

export default Settings
