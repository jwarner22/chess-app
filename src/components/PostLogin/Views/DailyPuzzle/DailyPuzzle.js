import {useState, useEffect, useContext, useLayoutEffect} from "react";
import {Link, useLocation} from 'react-router-dom'
import { DailyPuzzleContainer, 
  DailyPuzzleTitle, 
  DailyPuzzleWrapper, 
  DailyPuzzleHeaderImg,
  PuzzleWrapper,
  Container,
  SelectionContainer,
  GeneratingTrainingContainer,
ProgressBarContainer} from "./DailyPuzzleElements";
import Subtitle from "../../../UI_Kit/CategoryTitle/Subtitle";
import headerImg from "./../../../../Images/DailyPuzzleIcon.svg";
import DailyPuzzleModuleContainer from "./DailyPuzzleModuleContainer";
import {Modules} from "../../../../data/ModuleData";
import ChessboardLoader from "../../../ChessBoardLoader/ChessboardLoader";
// import {ProgressBar, Step} from 'react-step-progress-bar';
import {useTransition} from 'react-spring'
// utilities
import {wait} from '../../../Module/Utilities/helpers';
import ProgressBar from "../../../UI_Kit/Progress/ProgressBar";
import {useLocalStorage} from '../../../../hooks/useLocalStorage'
import {useSessionStorage} from '../../../../hooks/useSessionStorage'
// context
import {UserContext} from '../../../../providers/GlobalState'
//import BrandPage from "../../../BrandPage/BrandPage";
//import { Semanticuireact } from "styled-icons/simple-icons";
//import { useSessionStorage } from "../../../../hooks/useSessionStorage";


export default function DailyPuzzzle(props) {
  // state variables
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  //const [completedModules, setCompletedModules] = useState([])
  const [percent, setPercent] = useLocalStorage("dailyCompletedPercentage", '0');
  const [previousPercent, setPreviousPercent] = useState(0);
  const [screenTimer, setScreenTimer] = useState(false);
  const [openSplash, setOpenSplash] = useState(false)
  const [animate, setAnimate] = useState(false);
  const {dailyModules, generating, updateGenerating, openingStats, contextLoading} = useContext(UserContext);
  const {isMobile, windowDimension} = props;
  const {state} = useLocation()
  const fromLogin = (state == null) ? false : state.fromLogin

  const splashTransition = useTransition( openSplash, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: {
        duration: 1500
    }
});
//console.log(percent)
useEffect(() => {
  if (dailyPicks.length > 0) {
    let completedPercentage = dailyPicks.filter(pick => pick.completed).length/3*100;
    completedPercentage = Math.round(completedPercentage);
    completedPercentage = completedPercentage > 100 ? 100 : completedPercentage;
    let prevStoredPercent = sessionStorage.getItem("dailyCompletedPercentage")
    
    if (prevStoredPercent != null) { // if there is a previous stored percentage
      prevStoredPercent = parseInt(prevStoredPercent) // convert to int
      setPreviousPercent(parseInt(prevStoredPercent)) 
      if (completedPercentage > prevStoredPercent) { // if the new percentage is greater than the previous stored percentage
        setAnimate(true) // set the animation to true
      }
    } 
    setPercent(completedPercentage)
    sessionStorage.setItem('dailyCompletedPercentage', completedPercentage)
    setAnimate(false)
  }
},[dailyPicks])

// useLayoutEffect(() => {
//   if(percent > 0){
//     setPreviousPercent(percent - 25)
//   }
// }, [percent]);


//Checks to see if this page has been visited during this session. Controls animations so they only occur the first time a page is rendered during a session.
  // useEffect(() => {
  //   console.log(typeof(window.sessionStorage.getItem("dailyPageVisit")))
  //   if (JSON.parse(sessionStorage.getItem("dailyPageVisit")) == null) {
  //     setAnimate(true)
  //     sessionStorage.setItem("dailyPageVisit", 1)
  //   } else {
  //     setAnimate(false)
  //   }
  // }, [])
  
  useLayoutEffect(() => {
    if(fromLogin) {
      transitionScreens()
    }
  }, [])

  const transitionScreens = async () => {
    // setOpenSplash(true)
    // await wait(3000)
    // setOpenSplash(false)
    if(!generating) return
    setScreenTimer(true)
    await wait(3000)
    setScreenTimer(false)
    updateGenerating(false)
  }
//Splash screen transition
//  console.log(state)

//   useEffect(() => {
//     handleSplash()
// }, [])

// function handleSplash(){
//     setTimeout(toggleSplash, 3000)
// }

// const toggleSplash = () => {
//     setOpenSplash(!openSplash)
// }


  useEffect(() => {
    if (windowDimension[0] === 0) return;
      setLoaded(false);
      transformDaily();
      setLoaded(true);

    },[props])

  useEffect(() => {
    if (windowDimension[0] === 0) return;
    if (dailyPicks.length === 0) {
      setLoaded(false);
      transformDaily();
      setLoaded(true);
    }
  },[dailyModules])

  // useEffect(() => {
  //   if (generating) {
  //     setTimer();
  //   }
  // },[generating])

  const transformDaily = async () => {
    let modules = [...Modules]; // copy of Modules
    let daily = [...dailyModules]; // copy of dailyModules

    setSchemaPicks([...daily]); // set schema picks to daily
    daily = daily.map((module, index) => {
      let locatedModule = daily.find(item => item.location === index);
      let item = modules.find(entry => entry.id === locatedModule.theme_id)
      return {...item, ...locatedModule}
    })

    setDailyPicks(() => [...daily]); // set data for display and module consumption
  }
 
  //initial module completion check. Creates state for completedModules
//   useEffect(() => {
//     console.log(dailyPicks)
//     let completedArr = dailyPicks.map(pick  => {
//       if (pick.completed) {
//         return "Completed"
//       }
//     return "Incomplete"
//   })
//     setCompletedModules(completedArr)

//   }, [dailyPicks])

// //returns the completion percentage of modules to 
//   useEffect(() => {
//     let completedPercentage = completedModules.filter(item => item === "Completed").length / 3 * 100;

//     setPercent(completedPercentage)
//   },[completedModules])

  
  // displays "generating daily training" message and hides it after timer
  // const setTimer = async () => {
  //   console.log('daily render')
  //   // update generating state
  //     setScreenTimer(prev => !prev)
  //     await wait(2000)
  //     setScreenTimer(prev => !prev)
  //     updateGenerating(false)
  // 

  
  if (!loaded | dailyPicks.length === 0 | contextLoading | openingStats === undefined | openingStats.length === 0) {
    return <ChessboardLoader />
  }

  // if(openSplash) {
  //   return <> 
  //   {splashTransition((styles,item) => item && <animated.div style={styles}>
  //     <BrandPage />
  //   </animated.div>)}
  // </>
  // }

  if (screenTimer) {
    return (
      <>
        <GeneratingTrainingContainer>
        <DailyPuzzleHeaderImg src={headerImg}/>
        <DailyPuzzleTitle>
          Generating Today's Training...
        </DailyPuzzleTitle>
        </GeneratingTrainingContainer>
      </>
    )
  }

  return (
    <>
       <Container>
   <DailyPuzzleWrapper>
      <DailyPuzzleContainer>
      <Subtitle>Recommended Workout</Subtitle>
        </DailyPuzzleContainer>
        <SelectionContainer>
        <PuzzleWrapper>
        <ProgressBarContainer>
          <ProgressBar done={parseInt(percent)} initialWidth={previousPercent} animate={animate}/>
          {/* <ProgressBar width={'100%'} height={15} percent={percent} filledBackground='linear-gradient(to right, #fefb72, #f0bb31'>
          <Step transition="scale">{({accomplished})=> (<img alt='' style={{display:'none', filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="30"/>)}</Step>
              <Step transition="scale">{({accomplished})=> (<img alt='' style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="25"/>)}</Step>
              <Step transition="scale">{({accomplished})=> (<img alt='' style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="25"/>)}</Step>
              <Step transition="scale">{({accomplished})=> (<img alt='' style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="25"/>)}</Step>
          </ProgressBar> */}
          </ProgressBarContainer>
         {dailyPicks.map((module, index) => {
          
           if (index===3) { // if module is an opening module
            //{pathname: `/pre-opening-test/${props.currentOpening.uci}`
            let uci = openingStats.find(entry => entry.opening_id === module.theme_id).uci
            let currentOpening = openingStats.find(entry => entry.opening_id === module.theme_id)
             module = {...module, headline: module.title, subheading: 'Opening', img: require('../../../../Images/Books.svg').default };
             return(
              <Link key={index} style={{textDecoration: 'none'}} to={module.locked ? '#' : {pathname: `/pre-opening-test/${uci}`, state: {currentOpening: currentOpening, module: module, isDaily: true, location: module.location}}}>
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
