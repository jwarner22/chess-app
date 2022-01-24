import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
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
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [screenTimer, setScreenTimer] = useState(true);

  const windowSize = useWindowSize();
  const isMobile = windowSize[0] <= 640;
  
  const {dailyModules} = useContext(UserContext);


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
    } catch (e) { //just in case
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
