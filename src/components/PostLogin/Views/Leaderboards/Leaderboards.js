import React, {useState, useEffect} from 'react'
import {Container} from "../../../Login/LoginElements";
import {LeaderboardContainer, LeaderboardHeaderContainer, LeaderboardHeaderWrapper, ComingSoonHeading, ComingSoonSubheading} from "./LeaderboardElements"
import LeaderboardLeagues from "./LeaderboardLeagues";
import LeaderboardSection from './LeaderboardSection';
import LeaderboardTiles from "./LeaderboardTiles"
import {baseURL} from "../../../api/apiConfig"
import useFetch from '../../../api/useFetch';
import Loader from "../../../Loader"


const LeaderboardsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalScore, setTotalScore] = useState(0);
    const [profileData, setProfileData] = useState({});
    const [users, setUsers] = useState([])
    const {get} = useFetch(baseURL)
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        fetchProfileData();
        fetchUsers()
    },[])
    

    async function fetchProfileData() {
        let endpoint = `/users/${userID}`;
        let profileData = await get(endpoint)
        setProfileData(profileData)
        console.log(profileData)
        setIsLoading(false)
      }

    async function fetchUsers() {
        let endpoint = `/users`
        let users = await get(endpoint)
        setUsers(users)
        console.log(users)
        setIsLoading(false)
    }

    return (
        <Container>
            <LeaderboardHeaderContainer>
                <LeaderboardHeaderWrapper>
                    <LeaderboardLeagues />
                        <ComingSoonHeading>
                            League Rankings Coming Soon
                        </ComingSoonHeading>
                        <ComingSoonSubheading>
                            Top 15 will advance to the next league
                        </ComingSoonSubheading>
                </LeaderboardHeaderWrapper>
            </LeaderboardHeaderContainer>
            <LeaderboardContainer>
                {isLoading && <Loader />}
                <LeaderboardSection />
            </LeaderboardContainer>
        </Container>
    )
}

export default LeaderboardsPage
