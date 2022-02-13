import React, {useState, useContext} from "react";
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
import {useWindowSize} from '../../Hooks/UseWindowSize';
import {UserContext} from '../../../GlobalState';
import Loader from '../../Loader';

const Home = () => {
     //hamburger sidebar menu
    const [isOpen, setIsOpen] = useState(false)
    
    const {contextLoading} = useContext(UserContext);
    const windowDimension = useWindowSize();
    const isMobile = windowDimension[0] <= 640;

    const toggle = () => {
        setIsOpen(!isOpen)
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
        <DashNavbar toggle={toggle}/>
        </>
      )}
      <>
      <Switch>
        <Route exact path="/home/daily">
          <Daily />
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