import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { DailyPuzzleContainer, 
  DailyPuzzleTitle, 
  DailyPuzzleWrapper, 
  DailyPuzzleHeaderImg,
  PuzzleWrapper,
  Container,
  SelectionContainer} from "./DailyPuzzleElements";
import Modal from "./Modal"; 
import headerImg from "./../../../../Images/DailyPuzzleIcon.svg"
import DailyPuzzleModuleContainer from "./DailyPuzzleModuleContainer"
import {Modules} from "../../Views/PatternRecognition/CourseTiles/Data"
import { baseURL } from "../../../api/apiConfig";
import useFetch from '../../../api/useFetch';
import MobileNavbar from "../../../PostLogin/MobileNavBar/MobileNavBar"
import DashNavbar from "../../../PostLogin/DashboardNavbar/DashboardNavbar"
import DashSidebar from '../../../PostLogin/DashboardSidebar/DashboardSidebar'
import CompletedTraining from './completedTraining';


export default function DailyPuzzzle() {
  const [seen, setSeen] = useState(false); // set to true to display modal on load
  const [completed, setCompleted] = useState(false); // set to true to display completed screen
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const {get, put, post} = useFetch(baseURL);
  const userId = localStorage.getItem('userID')
  const now = new Date()


  useEffect(() => {
    if (isMounted) {
      setDailyPuzzles()
    }
    return () => setIsMounted(false) // componentDidUnMount
  },[])


  const setDailyPuzzles = async () => {
 
    //const storedDailyPuzzles = JSON.parse(localStorage.getItem('dailyPuzzles'));
    let storedDailyPuzzles = await getDailyPuzzles();
  
    let storedDateString = storedDailyPuzzles[0].inserted_at;
    let storedDate = new Date(storedDateString);

    if ((storedDate.getMonth() !== now.getMonth()) | (storedDate.getDate() !== now.getDate())) {
      let returnedPicks = await getNewPicks();
      setDailyPicks(returnedPicks.mutatedPicks)
      setSchemaPicks(returnedPicks.schemaPicks)

    } else {
      let picks = Modules.filter(module => {
        return storedDailyPuzzles.some(entry => entry.theme_id === module.id)
        })

      let mutatedPicks = picks.map((pick,index) => {
        let stored = storedDailyPuzzles.find(module => module.location === index)
        return {...pick, completed: stored.completed, locked: stored.locked, inserted_at: stored.inserted_at}
      });
      
      setSchemaPicks(storedDailyPuzzles);
      setDailyPicks(mutatedPicks);

      if (storedDailyPuzzles.every(entry => entry.completed === true)) {

        setCompleted(true)
      }
      
    }
    setLoaded(true)
  }

  // creates daily puzzles for new user
  const createPicks = async (picks) => {
    let endpoint = `/users/${userId}/daily_puzzles`;
    await post(endpoint, picks)
  }

  // fetches daily puzzles from API
  const getDailyPuzzles = async () => {
    let endpoint = `/users/${userId}/daily_puzzles`;
    try {
      let data = await get(endpoint)
      if (data.detail === 'daily puzzles not found' || data.length < 4) {
        const returnedPicks = await getNewPicks(); // generate new picks
        await createPicks(returnedPicks.schemaPicks) // create daily puzzles for new user
        return returnedPicks.schemaPicks;
      } else {
        return data // return daily puzzles from API
      }
    } catch (e) {
      alert(e)
    }
  }

  const getNewPicks = async () => {
    let endpoint = `/users/${userId}/daily_puzzles/picks`;
    try {
      let fetchedPicks = await get(endpoint) // gen new picks from API
      let returnedPicks = await setPicks(fetchedPicks) // map picks to modules and save
      return returnedPicks // return picks for use in rendering conditional on some criteria
    } catch (e) {
      alert(e)
    }
  }

  // converts picks to modules and maps to API schema
  const setPicks = async (selections) => {

    // maps api picks to module data
    let picks = Modules.filter(element => {
      return selections.some(entry => entry === element.id)
      })

    // sets puzzles to incomplete and locked
    let mutatedPicks = picks.map(pick => {return {...pick, completed: false, locked: true, inserted_at: now.toString()}})
    mutatedPicks[0].locked = false; // unlcocks first puzzle
    
    // map data for rendering to API schema
    let schemaPicks = mutatedPicks.map((pick, index) => {
      let schemadPick = {
      location: index,
      theme_id: pick.id,
      title: pick.type_ref,
      completed: pick.completed,
      locked: pick.locked,
      inserted_at: pick.inserted_at
    }
    return schemadPick
    });
    
    
    // store to localStorage to persist over day
    //localStorage.setItem('dailyPuzzles',JSON.stringify(mutatedPicks));
    
    await storePicks(schemaPicks) // update database
    return {schemaPicks, mutatedPicks}; // return data in API schema formata and render format
  }

  // updates picks in database
  const storePicks = async picks => {
    let endpoint = `/users/${userId}/daily_puzzles`
    put(endpoint, picks)
    .then(data => console.log(data))
    .catch(e => alert(e))
  }

  const togglePop = () => {
    setSeen(prevSeen => !prevSeen)
  }

  //hamburger side menu 
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  //mobile navigation bar
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

  console.log(isMobile)

  if (completed) {
    return(
      <CompletedTraining isMobile={isMobile}/>
    )
  }

  return (
    <>
       <div className="page"> 
   {isMobile ? (
    <MobileNavbar />
    ) : (
      <>
      <DashNavbar toggle={toggle}/>
      <DashSidebar isOpen={isOpen} toggle={toggle} />
      </>
      )}
    {seen ? <Modal toggle={togglePop} /> : null}
   {(loaded) &&
   <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Today's Training
        </DailyPuzzleTitle>
        </DailyPuzzleContainer>
        <SelectionContainer>
        <PuzzleWrapper>
         {dailyPicks.map((module, index) => {
           if (module.category === 'opening') {
             return(
              <Link key={index} style={{textDecoration: 'none'}} to={module.locked ? '#' : {pathname: '/opening', state: {module: module, schemaPicks:schemaPicks, isDaily: true}}}>
              <DailyPuzzleModuleContainer key={index} {...module} />
            </Link>
             )
           } else {
            return (
              <Link key={index} style={{textDecoration: 'none'}} to={module.locked ? '#' : {pathname: '/dashboard/module', state: {module: module, schemaPicks:schemaPicks, isDaily: true}}}>
                <DailyPuzzleModuleContainer key={index} {...module} />
              </Link>
            )
          }})}
        </PuzzleWrapper>
        </SelectionContainer>
   </DailyPuzzleWrapper>
   </Container>
  }
     </div>
   </>
  );

}
