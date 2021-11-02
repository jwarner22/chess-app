import { useEffect, useState } from 'react'
import styled from "styled-components"
import {Link} from 'react-router-dom';

const TextWrapper = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    align-items: center;
    justify-content: space-around;
    text-decoration: none;
`

const IntakeOption = (props) => {
    return(
        <>
        <SurveyGridTile>
            <SurveyAnswerTextWrapper>
            <SurveyAnswerText>
                <TextWrapper>
                {props.text}
                </TextWrapper>
            </SurveyAnswerText>
            </SurveyAnswerTextWrapper>
            </SurveyGridTile>
        </>
    )
}

const IntakeSurvey = () => {
    const options = ["Beginner", "Novice", "Intermediate", "Expert", "Master"]
    const [windowDimension, setWindowDimension] = useState(null);

    useEffect(() => {
      setWindowDimension(window.innerWidth);
    }, []);
  
    useEffect(() => {
      function handleResize() {
        setWindowDimension(window.innerWidth);
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const isMobile = windowDimension <= 640;

    return(
    <>
    <SurveyTitleWrapper isMobile={isMobile}>How would you describe your chess skill level?</SurveyTitleWrapper>
    <AnswerContainer isMobile={isMobile}>
        <AnswerWrapper>
            <AnswerContent>
                <SurveyAnswerGrid>
                        {options.map((option, index) => {
                            return(
                                <AnswerLink key={index} to={{pathname: "/create-user", state: {index: index}}}>
                                <IntakeOption text={option} />
                                </AnswerLink>
                            )
                        })}
                </SurveyAnswerGrid>
            </AnswerContent>
        </AnswerWrapper>
    </AnswerContainer>
    </>
    )
}
export default IntakeSurvey


const SurveyTitleWrapper = styled.h2`
    display: flex;
    max-width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #232323;
    padding: ${({isMobile}) => ((isMobile) ? '48px 12px' : '48px 0px')};
    min-height: 70px;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    line-height: 36px;
`

const AnswerContainer = styled.div`
    min-height: 100vh;
    padding-top: ${({isMobile}) => ((isMobile) ? '60%' : '20vh')};
`

const AnswerWrapper = styled.div`
    align-items: center;
    color: #fff;
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    max-width: 100%;
    text-align: center;
    z-index: 1;
`

const AnswerContent = styled.div`
    flex-grow: 1;
    max-width: 600px;
    padding: 0 10px;
    width: 100%;
`

const SurveyAnswerGrid = styled.ul`
    display: grid;
    grid-auto-flow: row;
    grid-gap: 8px;
`
const SurveyAnswerTextWrapper = styled.div`
    display: flex;
    min-height: 100%;
    justify-content: center;
    align-items: center;
`

const SurveyAnswerText = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 100%;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
`

const AnswerLink = styled(Link)`
    color: #54606c;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    align-items: center;
`
const SurveyGridTile = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 64px;
    list-style-type: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
    border-radius: 10px;
`