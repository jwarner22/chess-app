import React from 'react'
import {LeaderboardLeaguesContainer, LeaguesWrapper, LeaguesIcon} from "./LeaderboardElements"
import lock from "../../../../Images/lock.png"

const LeaderboardLeagues = () => {
    return (
        <>
            <LeaderboardLeaguesContainer>
                <LeaguesWrapper>
                    <LeaguesIcon src={lock} />
                </LeaguesWrapper>
                <LeaguesWrapper>
                    <LeaguesIcon src={lock} />
                </LeaguesWrapper>
                <LeaguesWrapper>
                    <LeaguesIcon src={lock} />
                </LeaguesWrapper>
                <LeaguesWrapper>
                    <LeaguesIcon src={lock} />
                </LeaguesWrapper>
                <LeaguesWrapper>
                    <LeaguesIcon src={lock} />
                </LeaguesWrapper>
            </LeaderboardLeaguesContainer>
        </>
    )
}

export default LeaderboardLeagues
