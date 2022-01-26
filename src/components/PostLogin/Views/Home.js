import React, {useState} from "react";
import DashNavbar from '../DashboardNavbar/DashboardNavbar';
import DashSidebar from '../DashboardSidebar/DashboardSidebar';
// import Body from "..//CoursesBody/CoursesBody";
import MobileNavbar from "../MobileNavBar/MobileNavBar";
// import PageHeader from "../../../../PageHeaders/PageHeaders";

import {useWindowSize} from '../../Hooks/UseWindowSize';

const Home = () => {
     //hamburger sidebar menu
    const [isOpen, setIsOpen] = useState(false)

    const windowDimension = useWindowSize();
    const isMobile = windowDimension[0] <= 640;

    const toggle = () => {
        setIsOpen(!isOpen)
      }

    return (<> {isMobile ? (
        <>
        {/* <PageHeader pageTitle={pageTitle}/> */}
      <MobileNavbar />
      </>
      ) : (
        <>
            <DashSidebar isOpen={isOpen} toggle={toggle} />
        <DashNavbar toggle={toggle}/>
        </>
      )}
      </>)
}

export default Home;