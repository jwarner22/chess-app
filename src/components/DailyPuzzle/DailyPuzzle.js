import React, {useState, useEffect} from "react";
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


export default function DailyPuzzzle() {
  const [seen, setSeen] = useState(false); // set to true to display modal on load
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);

  const togglePop = () => {
    setSeen(prevSeen => !prevSeen)
  }

  useEffect(() => {
    checkFresh()
    getPicksFromStorage()
  },[])

  const checkFresh = () => {
    // check API to see if puzzles are fresh
  }

  const getPicksFromStorage = () => {
    const today = new Date()
    const storedDailyPuzzles = JSON.parse(localStorage.getItem('dailyPuzzles'));

    if (storedDailyPuzzles == null) {// | (storedDailyPuzzles.date.getMonth() !== today.getMonth() | storedDailyPuzzles.date.getDate() !== today.getDate()))  {
      // get new puzzles
      fetchDailyPuzzles()
      return
    } 
    
    const storedDateString = storedDailyPuzzles[0].date;
    const storedDate = new Date(storedDateString);

    if ((storedDate.getMonth() !== today.getMonth()) | (storedDate.getDate() !== today.getDate())) {
      // add functionality to prompt continue where left off if previous modules partially completed
      fetchDailyPuzzles();
    } else { 
      setDailyPicks(storedDailyPuzzles);
      setLoaded(true)
    }

  }

  const fetchDailyPuzzles = () => {
    const API = new FetchWrapper(baseURL)
    let user_id = localStorage.getItem('userID')
    let endpoint = `/users/${user_id}/daily_puzzles`
    API.get(endpoint).then(data => setPicks(data)).catch(e => console.log(e));
  }


  const setPicks = async (selections) => {
    // get date
    const today = new Date()
    // maps api picks to module data
    let picks = Modules.filter(element => {
      return selections.some(entry => entry === element.id)
      })
    // sets puzzles to incomplete and locked
    let mutatedPicks = picks.map(pick => {return {...pick, completed: false, locked: true, date: today}})
    mutatedPicks[0].locked = false; // unlcocks first puzzle
    // store to localStorage to persist over day
    localStorage.setItem('dailyPuzzles',JSON.stringify(mutatedPicks));
    // need to save to API
    // const API = new FetchWrapper(baseURL)
    
    

    setDailyPicks(mutatedPicks);
    setLoaded(true);
  }

  return (
    <>
    {console.log(dailyPicks)}
   <div> 
    {seen ? <Modal toggle={togglePop} /> : null}
   </div>
   {loaded &&
   <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Daily Puzzles
        </DailyPuzzleTitle>
        </DailyPuzzleContainer>
        <PuzzleWrapper>
         {dailyPicks.map((module, index) => {
            return (
              <Link key={index} style={{textDecoration: 'none'}} to={module.locked ? '#' : {pathname: '/dashboard/module', state: {module: module}}}>
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


// export default class DailyPuzzle extends React.Component {
//   state = {
//     //change this to true when the Puzzle Page is done.
//    seen: true,
//    loaded: false,
//    dailyPicks: []
//    };
//   togglePop = () => {
//    this.setState({
//     seen: !this.state.seen
//    });
//   };

//   componentDidMount() {
//     const API = new FetchWrapper(baseURL)
//     let user_id = localStorage.getItem('userID')
//     let endpoint = `/users/${user_id}/daily_puzzles`
//     API.get(endpoint).then(data => this.setPicks(data)).catch(e => console.log(e));
//   }

//   setPicks = (selections) => {
//     console.log('picks')
//     let picks = Modules.filter(element => {
//       return selections.some(entry => entry === element.id)
//       })
//     this.setState({...this.state, dailyPicks: picks, loaded: true})
//   }

// render() {
//   console.log(this.state.seen)
//   console.log(this.state.dailyPicks)
//   return (
//     <>
//    <div> 
//     {this.state.seen ? <Modal toggle={this.togglePop} /> : null}
//    </div>
//    {this.state.loaded &&
//    <Container>
//    <DailyPuzzleWrapper>
//       <DailyPuzzleContainer>
//         <DailyPuzzleHeaderImg src={headerImg}/>
//         <DailyPuzzleTitle>
//           Daily Puzzles
//         </DailyPuzzleTitle>
//         </DailyPuzzleContainer>
//         <PuzzleWrapper>
//          {this.state.dailyPicks.map((module, index) => {
//             return (
//               <Link key={index} style={{textDecoration: 'none'}} to={{pathname: '/dashboard/module', state: {module: module}}}>
//                 <DailyPuzzleModuleContainer key={index} {...module} />
//               </Link>
//             )
//           })}
//         </PuzzleWrapper>
//    </DailyPuzzleWrapper>
//    </Container>
//   }
//    </>
//   );
//  }
// }

