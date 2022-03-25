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
import {useTransition, animated} from 'react-spring'
// utilities
import {wait} from '../../../Module/Utilities/helpers';
import ProgressBar from "../../../UI_Kit/Progress/ProgressBar";
// context
import {UserContext} from '../../../../providers/GlobalState'
import BrandPage from "../../../BrandPage/BrandPage";
import { Semanticuireact } from "styled-icons/simple-icons";
import { useSessionStorage } from "../../../../hooks/useSessionStorage";


export default function DailyPuzzzle(props) {
  // state variables
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [completedModules, setCompletedModules] = useState([])
  const [percent, setPercent] = useState(0)
  const [screenTimer, setScreenTimer] = useState(false);
  const [openSplash, setOpenSplash] = useState(false)
  const [animate, setAnimate] = useState(true);
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

//Checks to see if this page has been visited during this session. Controls animations so they only occur the first time a page is rendered during a session.
  useEffect(() => {
    if (window.sessionStorage.getItem("firstPageVisit") === null) {
      setAnimate(true)
      window.sessionStorage.setItem("firstPageVisit", 1)
    } else {
      setAnimate(false)
    }
  }, [])
  
  useLayoutEffect(() => {
    if(fromLogin) {
      transitionScreens()
    }
  }, [])

  const transitionScreens = async () => {
    setOpenSplash(true)
    await wait(3000)
    setOpenSplash(false)
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

    setDailyPicks(() => {
      if (isMobile) {
        return [...daily]
      };
      return [...daily];  
    }); // set data for display and module consumption
  }
 
  //initial module completion check. Creates state for completedModules
  useEffect(() => {
    let completedArr = dailyPicks.map(pick  => {
      if (pick.completed) {
        return "Completed"
      }
    return "Incomplete"
  })
    setCompletedModules(completedArr)

  }, [dailyPicks])

//returns the completion percentage of modules to 
  useEffect(() => {
    let completedPercentage = completedModules.filter(item => item === "Completed").length / 3 * 100;

    setPercent(completedPercentage)
  },[completedModules])



  // displays "generating daily training" message and hides it after timer
  // const setTimer = async () => {
  //   console.log('daily render')
  //   // update generating state
  //     setScreenTimer(prev => !prev)
  //     await wait(2000)
  //     setScreenTimer(prev => !prev)
  //     updateGenerating(false)
  // 

  
  if (!loaded | dailyPicks.length === 0 | contextLoading | openingStats === undefined) {
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
          <ProgressBar done={percent}/>
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
