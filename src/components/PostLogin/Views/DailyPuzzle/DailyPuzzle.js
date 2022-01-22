import React, {useState, useEffect, useContext} from "react";
import {Link, useHistory} from 'react-router-dom'
import { DailyPuzzleContainer, 
  DailyPuzzleTitle, 
  DailyPuzzleWrapper, 
  DailyPuzzleHeaderImg,
  PuzzleWrapper,
  Container,
  SelectionContainer} from "./DailyPuzzleElements";
import headerImg from "./../../../../Images/DailyPuzzleIcon.svg"
import DailyPuzzleModuleContainer from "./DailyPuzzleModuleContainer"
import {Modules} from "../../Views/PatternRecognition/CourseTiles/Data"
import { baseURL } from "../../../api/apiConfig";
import useFetch from '../../../api/useFetch';
import MobileNavbar from "../../../PostLogin/MobileNavBar/MobileNavBar"
import DashNavbar from "../../../PostLogin/DashboardNavbar/DashboardNavbar"
import DashSidebar from '../../../PostLogin/DashboardSidebar/DashboardSidebar'

// utilities
import {useWindowSize} from '../../../Hooks/UseWindowSize'
import {wait} from '../../../Puzzle/Utilities/helpers'

// context
import {UserContext} from '../../../../GlobalState'

export default function DailyPuzzzle() {
  // state variables
  //const [seen, setSeen] = useState(false); // set to true to display modal on load
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [screenTimer, setScreenTimer] = useState(true);
  //const [windowDimension, setWindowDimension] = useState(window.innerWidth);   //mobile navigation bar
  //const isMobile = (windowDimension <= 640) ? true : false;
  const windowSize = useWindowSize();
  const isMobile = windowSize[0] <= 640;
  
  const {dailyModules} = useContext(UserContext);
  const {globalData} = useContext(UserContext);

  console.log(globalData)

  // misc. variables
  //const isMobile = windowDimension <= 640;
  const history = useHistory();
  const {get, put, post} = useFetch(baseURL);
  const userId = localStorage.getItem('userID')
  const now = new Date()

  // useEffect(() => {
  //   //setWindowDimension(window.innerWidth);
  //   if (isMounted) {
  //     //setDailyPuzzles();
  //     setTimer();
  //   }
  //   return () => setIsMounted(false) // componentDidUnMount
  // },[])

  useEffect(() => {
    if (isMounted) {
      transformDaily();
      setTimer();
    }
    return () => setIsMounted(false) // componentDidUnMount
  },[])

  const transformDaily = () => { 
    let picks = Modules.filter(module => {
      return dailyModules.some(entry => entry.theme_id === module.id)
      })

    let mutatedPicks = picks.map((pick,index) => {
      let stored = dailyModules.find(module => module.location === index)
      return {...pick, completed: stored.completed, locked: stored.locked, inserted_at: stored.inserted_at}
    });
    
    // set data for display and module consumption
    setDailyPicks(mutatedPicks);
    setSchemaPicks(dailyModules)
    setLoaded(true)
  }

  // useEffect(() => {
  //   function handleResize() {
  //     //setWindowDimension(window.innerWidth);
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // gets daily puzzle module data
  // const setDailyPuzzles = async () => {
 
  //   // get daily puzzles from api
  //   let storedDailyPuzzles = await getDailyPuzzles();
    
  //   // convert stored string to date
  //   let storedDateString = storedDailyPuzzles[0].inserted_at;
  //   let storedDate = new Date(storedDateString);


  //   // check if we need to get new daily puzzle picks (refactor to backend cache?)
  //   if ((storedDate.getMonth() !== now.getMonth()) | (storedDate.getDate() !== now.getDate())) {
  //     let returnedPicks = await getNewPicks();
  //     setDailyPicks(returnedPicks.mutatedPicks)
  //     setSchemaPicks(returnedPicks.schemaPicks)

  //   } else {
  //     let picks = Modules.filter(module => {
  //       return storedDailyPuzzles.some(entry => entry.theme_id === module.id)
  //       })

  //     let mutatedPicks = picks.map((pick,index) => {
  //       let stored = storedDailyPuzzles.find(module => module.location === index)
  //       return {...pick, completed: stored.completed, locked: stored.locked, inserted_at: stored.inserted_at}
  //     });
      
  //     // set data for display and module consumption
  //     setSchemaPicks(storedDailyPuzzles);
  //     setDailyPicks(mutatedPicks);

  //     // check if completed training page has been displayed
  //     let completedTrainingDisplayed = (sessionStorage.getItem('completedTrainingDisplayed') === 'true');
      
  //     // check user daily training completion
  //     let endpoint = `/users/${userId}`
  //     let data = await get(endpoint);
  //     let lastDaily = new Date(data.last_daily);

  //     // push to completed training page
  //     if (lastDaily.getMonth() === now.getMonth() && lastDaily.getDate() === now.getDate() && completedTrainingDisplayed === false) {
  //       history.push('/completed-training')
  //       sessionStorage.setItem('completedTrainingDisplayed', 'true')
  //     }
      
  //   }
  //   setLoaded(true)
  // }


  // // creates daily puzzles for new user
  // const createPicks = async (picks) => {
  //   let endpoint = `/users/${userId}/daily_puzzles`;
  //   await post(endpoint, picks)
  // }

  // // fetches daily puzzles from API
  // const getDailyPuzzles = async () => {
  //   let endpoint = `/users/${userId}/daily_puzzles`;
  //   try {
  //     let data = await get(endpoint)
  //     if (data.detail === 'daily puzzles not found' || data.length < 4) {
  //       const returnedPicks = await getNewPicks(); // generate new picks
  //       await createPicks(returnedPicks.schemaPicks) // create daily puzzles for new user
  //       return returnedPicks.schemaPicks;
  //     } else {
  //       return data // return daily puzzles from API
  //     }
  //   } catch (e) {
  //     alert(e)
  //   }
  // }

  // const getNewPicks = async () => {
  //   // reset the daily puzzle cycle for the day
  //   localStorage.setItem('completedTrainingDisplayed', 'false')
  //   let endpoint = `/users/${userId}/daily_puzzles/picks`;
  //   try {
  //     let fetchedPicks = await get(endpoint) // gen new picks from API
  //     let returnedPicks = await setPicks(fetchedPicks) // map picks to modules and save
  //     return returnedPicks // return picks for use in rendering conditional on some criteria
  //   } catch (e) {
  //     alert(e)
  //   }
  // }

  // // converts picks to modules and maps to API schema
  // const setPicks = async (selections) => {

  //   // maps api picks to module data
  //   let picks = Modules.filter(element => {
  //     return selections.some(entry => entry === element.id)
  //     })

  //   // sets puzzles to incomplete and locked
  //   let mutatedPicks = picks.map(pick => {return {...pick, completed: false, locked: true, inserted_at: now.toString()}})
  //   mutatedPicks[0].locked = false; // unlcocks first puzzle
    
  //   // map data for rendering to API schema
  //   let schemaPicks = mutatedPicks.map((pick, index) => {
  //     let schemadPick = {
  //     location: index,
  //     theme_id: pick.id,
  //     title: pick.type_ref,
  //     completed: pick.completed,
  //     locked: pick.locked,
  //     inserted_at: pick.inserted_at
  //   }
  //   return schemadPick
  //   });

  //   await storePicks(schemaPicks) // update database
  //   return {schemaPicks, mutatedPicks}; // return data in API schema formata and render format
  // }

  // // updates picks in database
  // const storePicks = async picks => {
  //   let endpoint = `/users/${userId}/daily_puzzles`
  //   put(endpoint, picks)
  //   .then(data => console.log(data))
  //   .catch(e => alert(e))
  // }

  // const togglePop = () => {
  //   setSeen(prevSeen => !prevSeen)
  // }

  //hamburger side menu 
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }


  // displays "generating daily training" message and hides it after timer
  const setTimer = async () => {

    // get last display of screen time
    let lastScreenTime = new Date(parseInt(localStorage.getItem('lastDailySplashScreenTime')));
    let now = new Date();

    // check if we need to display the message
    try {
      if (lastScreenTime.getDate() !== (now.getDate())) {

        // show splash screen
        setScreenTimer(prev => !prev)
        await wait(2000);
        setScreenTimer(prev => !prev) // hide splash screen

        // update localStorage
        localStorage.setItem('lastDailySplashScreenTime', Date.now().toString())
      }
    } catch (e) {
      // just in case
      // show splash screen
      setScreenTimer(prev => !prev)
      await wait(2000)
      setScreenTimer(prev => !prev)
      // update localStorage
      localStorage.setItem('lastDailySplashScreenTime', Date.now().toString())
    }
    
  }


  if (!screenTimer) {
    return (
      <>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Generating Today's Training...
        </DailyPuzzleTitle>
      </>
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
   {(loaded) &&
   <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        {/* <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Today's Training
        </DailyPuzzleTitle> */}
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
