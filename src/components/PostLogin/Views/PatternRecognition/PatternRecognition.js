import Body from "./CoursesBody/CoursesBody";
import styled from "styled-components";


const Dashboard = () => {

  return (
    <>
    <DashboardWrapper>
    <HeadingWrapper>
    <PatternRecognitionHeading>Choose a <br></br> <strong>Puzzle to Play</strong></PatternRecognitionHeading>
    <PatternRecognitionSubheading>Categories</PatternRecognitionSubheading>
    </HeadingWrapper>
      <Body/>
      </DashboardWrapper>
      </>
  );
};
export default Dashboard;


export const DashboardWrapper =styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #EEF0FF;
`
export const PatternRecognitionHeading = styled.h1`
  font-size: 24px;
  color: #54606c;
  padding: 24px 0px;
  text-align: center;

@media screen and (max-width: 450px) {
  font-size: 18px;
  margin: 18px 0px 24px 0px;
  font-weight: 200;
  opacity: 0.7;
  width: 100%;
}
`

export const PatternRecognitionSubheading = styled.h2`
  font-size: 18px;
  color: #010EFF;
  text-align: center;
  padding-bottom: 12px;
  font-weight: 200;
  
  @media screen and (max-width: 450px) {
  font-size: 16px;
  font-weight: 200;
  opacity: 0.7;
  margin: 0px 0px 0px 24px;
  padding-bottom: 12px;
  width: 378px;
  }
`

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`