import React from 'react';



import {Modules} from '../../../../data/Data';
import {DashboardWrapper} from "../PatternRecognition/PatternRecognition"

import OpeningMenu from './OpeningMenu';
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import CourseTile from '../PatternRecognition/CourseTiles/CourseTiles';
import FooterBuffer from '../../../UI_Kit/FooterBuffer';


const Openings = () => {
  const e4Openings = Modules.filter(module => module.pawn === 'e4');
  const d4Openings = Modules.filter(module => module.pawn === 'd4');
  const c4Openings = Modules.filter(module => module.pawn === 'c4');

    return (
        <>
        <DashboardWrapper>
        <OpeningMenu />
        <PuzzleTileGrid className="e4Tiles" id={"e4"} category={'E4 Openings'}>
        {e4Openings.map((module, index) => {
                          return(
                          <CourseTile key={index} {...module} />
                      )})}
        </PuzzleTileGrid>
        <PuzzleTileGrid className="d4Tiles" id={"d4"} category={'D4 Openings'}>
        {d4Openings.map((module, index) => {
                          return(
                          <CourseTile key={index} {...module} />
                      )})}
        </PuzzleTileGrid>
        <PuzzleTileGrid className="c4Tiles" id={"c4"} category={'C4 Openings'}>
        {c4Openings.map((module, index) => {
                          return(
                          <CourseTile key={index} {...module} />
                      )})}
        </PuzzleTileGrid>
        </DashboardWrapper>
        <FooterBuffer />
        </>
    )
}

export default Openings

