import {useState, useEffect, useContext} from "react";
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
import headerImg from "./../../../../Images/DailyPuzzleIcon.svg"
import DailyPuzzleModuleContainer from "./DailyPuzzleModuleContainer"
import {Modules} from "../../../../data/ModuleData"
import Loader from '../../../Loader';
import {ProgressBar, Step} from 'react-step-progress-bar';

// utilities
import {wait} from '../../../Module/Utilities/helpers'

// context
import {UserContext} from '../../../../providers/GlobalState'
import BrandPage from "../../../BrandPage/BrandPage";

export default function DailyPuzzzle(props) {
  // state variables
  const [loaded,setLoaded] = useState(false);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [schemaPicks, setSchemaPicks] = useState([]);
  // const [reversed, setReversed] = useState(false);
  // const [isMounted, setIsMounted] = useState(true);
  const [completedModules, setCompletedModules] = useState([])
  const [percent, setPercent] = useState(0)
  const [screenTimer, setScreenTimer] = useState(true);
  const [openSplash, setOpenSplash] = useState(true)
  
  const {dailyModules, generating, updateGenerating} = useContext(UserContext);
  const {isMobile, windowDimension} = props;
  const {state} = useLocation()

//Splash screen transition
 console.log(state)

  useEffect(() => {
    handleSplash()
}, [])

function handleSplash(){
    setTimeout(toggleSplash, 3000)
}

const toggleSplash = () => {
    setOpenSplash(!openSplash)
}


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

  useEffect(() => {
    if (generating) {
      setTimer();
    }
  },[generating])

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
  const setTimer = async () => {
    console.log('daily render')
    // update generating state
      setScreenTimer(prev => !prev)
      await wait(2000)
      setScreenTimer(prev => !prev)
      updateGenerating(false)
  }
  
  if (!loaded | dailyPicks.length === 0) {
    return <Loader />
  }

  if(!openSplash && !screenTimer) {
    return <BrandPage openSplash={openSplash}/>
  }

  if (!screenTimer) {
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
          <ProgressBar width={'100%'} height={15} percent={percent} filledBackground='linear-gradient(to right, #fefb72, #f0bb31'>
          <Step transition="scale">{({accomplished})=> (<img alt='' style={{display:'none', filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="30"/>)}</Step>
              <Step transition="scale">{({accomplished})=> (<img alt='' style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="25"/>)}</Step>
              <Step transition="scale">{({accomplished})=> (<img alt='' style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="25"/>)}</Step>
              <Step transition="scale">{({accomplished})=> (<img alt='' style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}} width="25"/>)}</Step>
          </ProgressBar>
          </ProgressBarContainer>
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
