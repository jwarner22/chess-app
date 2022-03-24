import React from 'react';
import {Modules} from '../../../../data/ModuleData';
import {DashboardWrapper} from "../PatternRecognition/PatternRecognition"
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import CourseTile from '../PatternRecognition/CourseTiles/CourseTiles';
import FooterBuffer from '../../../UI_Kit/FooterBuffer';
import CategoryTitle from '../../../UI_Kit/CategoryTitle/CategoryTitle';
import { CurrentOpeningContainer } from '../../../UI_Kit/Tiles/PuzzleTileElements';
import { OpeningTreeTileWrapper } from '../../../UI_Kit/Tiles/OpeningTreeTiles';
import Tile from '../../../UI_Kit/Tiles/Tile';
import LargeConatiner from '../../../UI_Kit/Boxes/Containers/LargeConatiner';
import OpeningMastery from '../../../../Pages/Openings/OpeningMastery';


const Openings = () => {
  const e4Openings = Modules.filter(module => module.pawn === 'e4');
  const d4Openings = Modules.filter(module => module.pawn === 'd4');
  const c4Openings = Modules.filter(module => module.pawn === 'c4');

    return (
        <>
        <DashboardWrapper>
        <OpeningMastery />
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

