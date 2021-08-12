import React from "react";
import {Link} from 'react-router-dom'
import { DailyPuzzleContainer, 
  DailyPuzzleTitle, 
  DailyPuzzleWrapper, 
  DailyPuzzleHeaderImg,
  PuzzleWrapper,
  Container} from "./DailyPuzzleElements";
import Modal from "./Modal"; 
import headerImg from "./../../Images/DailyPuzzleHeaderImg.svg"
import DailyPuzzleModuleContainer from "./DailyPuzzleModuleContainer"
import {Modules} from "../../components/PostLogin/CoursesBody/CourseTile/Data.js"
import FetchWrapper from "../api/FetchWrapper";
import { baseURL } from "../api/apiConfig";


export default class DailyPuzzle extends React.Component {
  state = {
    //change this to true when the Puzzle Page is done.
   seen: true,
   loaded: false,
   dailyPicks: []
   };
  togglePop = () => {
   this.setState({
    seen: !this.state.seen
   });
  };

  componentDidMount() {
    const API = new FetchWrapper(baseURL)
    let user_id = localStorage.getItem('userID')
    let endpoint = `/users/${user_id}/daily_puzzles`
    API.get(endpoint).then(data => this.setPicks(data)).catch(e => console.log(e));
  }

  setPicks = (selections) => {
    console.log('picks')
    let picks = Modules.filter(element => {
      return selections.some(entry => entry === element.id)
      })
    this.setState({...this.state, dailyPicks: picks, loaded: true})
  }

render() {
  console.log(this.state.seen)
  console.log(this.state.dailyPicks)
  return (
    <>
   <div> 
    {this.state.seen ? <Modal toggle={this.togglePop} /> : null}
   </div>
   {this.state.loaded &&
   <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Daily Puzzles
        </DailyPuzzleTitle>
        </DailyPuzzleContainer>
        <PuzzleWrapper>
         {this.state.dailyPicks.map((module, index) => {
            return (
              <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
                <DailyPuzzleModuleContainer key={index} {...module} />
              </Link>
            )
          })}
        </PuzzleWrapper>
   </DailyPuzzleWrapper>
   </Container>
  }
   </>
  );
 }
}

