import React, {useState, useEffect}from 'react'
import MobileNavbar from "../PostLogin/MobileNavBar/MobileNavBar"
import DashboardNavbar from "../PostLogin/DashboardNavbar/Index"

const Openings = () => {

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

    return (
        <>
        {isMobile ? (
          <MobileNavbar />  
        ) : (
            <DashboardNavbar />
        )
    }
        <div>
            Openings
        </div>
        </>
    )
}

export default Openings
