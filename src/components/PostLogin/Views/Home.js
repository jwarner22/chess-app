import React, {useState, useContext, useEffect} from "react";
import {Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import DashNavbar from '../DashboardNavbar/DashboardNavbar';
import DashSidebar from '../DashboardSidebar/DashboardSidebar';
// import Body from "..//CoursesBody/CoursesBody";
import MobileNavbar from "../MobileNavBar/MobileNavBar";
// import PageHeader from "../../../../PageHeaders/PageHeaders";
import Daily from "./DailyPuzzle/DailyPuzzle";
import Practice from "./PatternRecognition/PatternRecognition";
import Openings from "./Openings/OpeningsDashboard";
import Profile from "./ProfilePage/ProfilePage";
import Leaderboards from "./Leaderboards/Leaderboards";
import {useWindowSize} from '../../../hooks/UseWindowSize';
import {UserContext} from '../../../providers/GlobalState';
import Loader from '../../Loader';
import DiscordModal from "../../DiscordModal/DiscordModal";
import NavbarDropdown from "../NavbarDropdown/NavbarDropdown";

const Home = () => {
     //hamburger sidebar menu
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(localStorage.getItem('discord-modal') === 'true')
    const {contextLoading} = useContext(UserContext);
    const [openDropdown, setOpenDropdown] = useState(false)
    const windowDimension = useWindowSize();
    const isMobile = windowDimension[0] <= 640;

  useEffect(() => {
    localStorage.setItem('discord-modal', isVisible);
  }, [isVisible])

  const discordToggle = () => {
    setIsVisible(false)
  }

    const toggle = () => {
        setIsOpen(!isOpen)
      }

      const dropdownToggle = () => {
        setOpenDropdown(!openDropdown)
      }


    if (contextLoading) {
      return(<Loader />)
    }

    return (<> {isMobile ? (
        <>
      <MobileNavbar />
      </>
      ) : (
        <>
        <DashSidebar isOpen={isOpen} toggle={toggle} />
        <DashNavbar toggle={toggle} openDropdown={openDropdown} dropdownToggle={dropdownToggle}/>
        <DiscordModal isVisible={isVisible} toggle={discordToggle}/>
        </>
      )}
      <>
      <Switch>
        <Route exact path="/home/daily">
          <Daily isMobile={isMobile} windowDimension={windowDimension}/>
        </Route>
        <Route exact path = "/home/practice">
          <Practice />
        </Route>
        <Route exact path = "/home/openings">
          <Openings />
        </Route>
        <Route exact path = "/home/profile">
          <Profile />
        </Route>
        <Route exact path = "/home/leaderboards">
          <Leaderboards />
        </Route>
      </Switch>
      </>
      </>)
}

export default Home;