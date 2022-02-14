import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
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
import Loader from '../../../Loader'

// utilities
import {wait} from '../../../Puzzle/Utilities/helpers'

// context
import {UserContext} from '../../../../GlobalState'

// Hooks
// import {useWindowSize} from '../../../Hooks/UseWindowSize'

export default function DailyPuzzzle(props) {
  // state variables
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  // const [reversed, setReversed] = useState(false);
  // const [isMounted, setIsMounted] = useState(true);
  const [screenTimer, setScreenTimer] = useState(true);
  
  const {dailyModules} = useContext(UserContext);
  const {isMobile} = props;
  // const windowSize = useWindowSize();
//   const isMobile = windowSize[0] < 640;

// console.log(windowSize)
  useEffect(() => {
    console.log('layout effect ran')
      setLoaded(false);
      transformDaily();
      setTimer();
      setLoaded(true);
    },[])

  // useEffect(() => {
    
  //   if (isMobile && windowSize[0] !== 0 && dailyPicks[0].location === 0 && !reversed) {
  //     console.log('reverse')
  //     setDailyPicks([...dailyPicks.reverse()]);
  //     setReversed(true);
  //   } else if (reversed && !isMobile) { 
  //     console.log('reverse')
  //     setDailyPicks([...dailyPicks.reverse()]);
  //     setReversed(false);
  //   }
  // } ,[windowSize])

  const transformDaily = async () => {
    console.log('transform daily')
    let modules = [...Modules]; // copy of Modules
    let daily = [...dailyModules]; // copy of dailyModules

    setSchemaPicks([...daily]); // set schema picks to daily
    daily = daily.map((module, index) => {
      let locatedModule = daily.find(item => item.location === index);
      let item = modules.find(entry => entry.id === locatedModule.theme_id)
      return {...item, ...locatedModule}
    })
    setDailyPicks(() => {
      if (isMobile) {
        return [...daily.reverse()]
      };
      return [...daily];  
    }); // set data for display and module consumption
  }
 

  // displays "generating daily training" message and hides it after timer
  const setTimer = async () => {
    // get last display of screen time
    let lastScreenTime = new Date(parseInt(sessionStorage.getItem('lastDailySplashScreenTime')));
    let now = new Date();
    // check if we need to display the message
    try {
      if (lastScreenTime.getDate() !== (now.getDate())) {
        // show splash screen
        setScreenTimer(prev => !prev)
        await wait(2000);
        setScreenTimer(prev => !prev) // hide splash screen
        // update localStorage
        sessionStorage.setItem('lastDailySplashScreenTime', Date.now().toString())
      }
    } catch (e) { //just in case
      // show splash screen
      setScreenTimer(prev => !prev)
      await wait(2000)
      setScreenTimer(prev => !prev)
      // update localStorage
      sessionStorage.setItem('lastDailySplashScreenTime', Date.now().toString())
    }
    
  }
  
  if (!loaded | dailyPicks.length === 0) {
    return <Loader />
  }

  if (!screenTimer) {
    return (
      <>
        <DailyPuzzleContainer>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Generating Today's Training...
        </DailyPuzzleTitle>
        </DailyPuzzleContainer>
      </>
    )
  }

  return (
    <>
       <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
        </DailyPuzzleContainer>
        <SelectionContainer>
        <PuzzleWrapper>
         {dailyPicks.map((module, index) => {
           if (module.category === 'opening') {
             return(
              <Link key={index} style={{textDecoration: 'none'}} to={module.locked ? '#' : {pathname: '/opening', state: {module: module, schemaPicks:schemaPicks, isDaily: true, location: module.location}}}>
              <DailyPuzzleModuleContainer key={index} {...module} />
            </Link>
             )
           } else {
            return (
              <Link key={index} style={{textDecoration: 'none'}} to={module.locked ? '#' : {pathname: '/dashboard/module', state: {module: module, schemaPicks:schemaPicks, isDaily: true, location: module.location}}}>
                <DailyPuzzleModuleContainer key={index} {...module} />
              </Link>
            )
          }})}
        </PuzzleWrapper>
        </SelectionContainer>
   </DailyPuzzleWrapper>
     </Container>
   </>
  );

}
