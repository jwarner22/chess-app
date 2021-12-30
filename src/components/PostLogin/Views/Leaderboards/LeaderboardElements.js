import styled from "styled-components"

//leaderboard page styling

export const LeaderboardHeaderContainer = styled.div`
    width: 100%;
    height: 45%;
    background: linear-gradient(143.66deg, #000DFF 21.19%, #6B73FF 78.81%);
`  

export const LeaderboardHeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    padding: 30px;
    flex-direction: column;
    align-items: center;
`

export const LeaderboardContainer = styled.div`
    width: 100%;
    background: white;
    position: relative;
    top: -30px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    height: 100%;
`

//leaderboard leagues styling

export const LeaderboardLeaguesContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    max-width: 500px;
`

export const LeaguesWrapper = styled.li`
    list-style-type: none;
    text-align: center;
`

export const LeaguesIcon = styled.img`
    max-width: 50px;
`

//Header text

export const ComingSoonHeading = styled.div`
    display: flex;
    padding-top: 12px;
    color: white;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
`

export const ComingSoonSubheading = styled.div`
    display: flex;
    padding-top: 8px;
    color: white;
    font-size: 18px;;
    text-align: center;
    margin-bottom: 24px;
`
//Leaderboard section styling

export const LeaderboardSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LeaderboardGridWrapper = styled.table`
    width: 90%;
    max-width: 800px;
    margin-top: 24px;
    grid-gap: 12px;
`

//leaderboard tile styling 

export const LeaderboardTileContainer = styled.tr`
    list-style-type: none;
    width: 100%;
    display: flex;
`

export const LeaderboardPlacement = styled.span`
    color: black;
    padding: 12px;
`

export const LeaderboardUsername = styled.span`
    color: black;
    padding: 12px;
`

export const LeaderboardScore = styled.span`
    color: black;
    width: 100%;
    padding: 12px;
    text-align: right;
`
export const LeaderboardTileImgWrappper = styled.div`
    
`