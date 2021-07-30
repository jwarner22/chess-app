import React, { useEffect, useState } from "react";
import "./style.css";
// import Demo from "./Demo";
// import registerServiceWorker from "./registerServiceWorker";
import PuzzlePage from "./PuzzleComponents/PuzzlePage";
// import {puzzleData} from './data.js'

export default function Puzzle(props) {
  const {rating,theme} = props;
  const [puzzles,setPuzzles] = useState();
  // const puzzles = puzzleData;
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
}
