import React, { useEffect, useState } from "react";
//import ReactDOM from "react-dom";
import "./style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
import Puzzle from "./components/puzzle.js";
import Opening from './components/OpeningPage.js';


export default function IndexPage() {
  const moduleType = 'opening';
  return(
    <>
    {(moduleType === 'puzzle') && <Puzzle rating={1200} theme = 'fork'/>}
    {(moduleType === 'opening') && <Opening />}
    </>
  )

  /*
  const {rating,theme} = props;
  const [puzzles,setPuzzles] = useState();

  useEffect(()=>fetchPuzzles(rating,theme),[])
  
  function fetchPuzzles(rating, theme) {
    const baseUrl = 'http://127.0.0.1:8000/puzzles/'
    const queryParams = `?rating=${rating}&theme=${theme}`
    fetch(baseUrl + queryParams).then(response => response.json()).then(data => {
      setPuzzles(data);
    })
  }

  return (
    <div>
      {puzzles && <PuzzlePage puzzles={puzzles}/>}
    </div>
  );
  */
}

//ReactDOM.render(<IndexPage />, document.getElementById("root"));
//registerServiceWorker();
