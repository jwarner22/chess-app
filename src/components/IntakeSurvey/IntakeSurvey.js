// import React, { Component } from 'react'
// import "./IntakeSurvey.css";
// import 'survey-react/survey.css';
// import * as Survey from "survey-react"
import {SmallTileContainer, 
    SmallTileWrapper, 
    SmallTileContent, 
    SmallTileIconWrapper, 
    SmallTileTitle, 
    ProgressBarWrapper, 
    SmallTileDescription,
    SmallTileIconContainer
} from "../AchievementTiles/SmallTileElements";
import styled from "styled-components"
import {Link} from 'react-router-dom';

const TextWrapper = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const IntakeOption = (props) => {
    return(
        <>
        <SmallTileContainer>
            <SmallTileWrapper>
                <TextWrapper>
                {props.text}
                </TextWrapper>
            </SmallTileWrapper>
        </SmallTileContainer>
        </>
    )
}

const IntakeSurvey = () => {
    const options = ["Beginner", "Novice", "Intermediate", "Expert", "Master"]

    return(
    <>
    <h2>How would you describe your chess skill level?</h2>
    <SmallTileContainer>
        <SmallTileWrapper>
            {options.map((option, index) => {
                return(
                    <Link to={{pathname: "/create-user", state: {index: index}}}>
                    <IntakeOption text={option} />
                    </Link>
                )
            })}
        </SmallTileWrapper>
    </SmallTileContainer>
    </>
    )
}

export default IntakeSurvey
// Survey
//     .StylesManager
//     .applyTheme("bootstrap");

// var myCss = {
//         navigationButton: "button btn-red"
//     };

// class IntakeSurvey extends Component {
//     constructor(props){
//         super(props)
//         this.state = {

//         }
//         this.onCompleteComponent = this.onCompleteComponent.bind(this)
//     }
//     onCompleteComponent = () => {
//         this.setState({ 
//             isCompleted: true
//         })
//     }
//     render(){
//         var json= { 
//             title: "Let's answer a few questions", 
//             pages: [{ 
//                 name:"page1", 
//                 questions: [{ 
//                     type: "radiogroup", 
//                     choices: [ "Yes", "No" ], 
//                     isRequired: true, 
//                     name: "frameworkUsing",
//                     title: "Does Joe eat ass?" }
//              ]},
//                 { 
//                 name: "page2", 
//                 questions: [{ 
//                     type: "radiogroup", 
//                     choices: ["Yes","No"],
//                     isRequired: true, 
//                     name: "mvvmUsing", 
//                     title: "Are you sure?" },
//             ]},
//             { 
//                 name: "page3",
//                 questions: [{ 
//                     type: "comment", 
//                     name: "about", 
//                     title: "Do you have any final comments?" } ] }
//            ]
//         };

//         const survey = new Survey.Model(json);

//         survey.onUpdateQuestionCssClasses.add(function(survey, options) {
//     var classes = options.cssClasses
//     classes.root = "sq-root";
//         classes.title = "sw-title"
//         classes.item = "sq-item";
//         classes.label = "sq-label";
//         classes.navigationButton = "nav-btn";


//         if (options.question.isRequired) {
//             classes.title += " sq-title-required";
//             classes.root += " sq-root-required";
//         }
//         if (options.question.getType() === "checkbox") {
//             classes.root += " sq-root-cb";
//         }
//     });

//         var surveyRender = !this.state.isCompleted ? (
//             <Survey.Survey
//                 json={json}
//                 showCompletedPage={false}
//                 onComplete={this.onCompleteComponent}
//                 model={survey}
//                 css={myCss}
//             />
//         ) : null
        
//         var onSurveyCompletion = this.state.isCompleted ? (
//             <div>Welcome to the club</div>
//         ) : null;
//     return (
//         <div>
//             {surveyRender}
//             {onSurveyCompletion}
//         </div>
//     )
// }
// }
// export default IntakeSurvey
