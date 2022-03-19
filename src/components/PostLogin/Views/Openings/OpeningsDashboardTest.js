import {useLayoutEffect, useState, useContext} from 'react';
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom';
import useFetch from '../../../../api/useFetch';
import {baseURL} from '../../../../api/apiConfig';
import OpeningTreeTiles from '../../../UI_Kit/Tiles/OpeningTreeTiles';
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import { PageContainer } from '../../../UI_Kit/Page';
import PreviousSelection from '../../../UI_Kit/PreviousSelection';
import CategoryTitle from '../../../UI_Kit/CategoryTitle/CategoryTitle';
import CurrentOpeningTreeTile from '../../../UI_Kit/Tiles/CurrentOpeningTreeTile';
import Loader from '../../../Loader';

import {UserContext} from '../../../../providers/GlobalState';
import GrayTileInfoModal from './GrayTileInfoModal';

const TOTAL_LICHESS_NP = 447000000;


const OpeningsDashboardTest = () => {
    const {get, post} = useFetch(baseURL);
    const [openingModules, setOpeningModules] = useState([]);
    const [currentOpening, SetCurrentOpening] = useState({});
    const {moves} = useParams();
    const [loading, setLoading] = useState(true);
    const [mastery, setMastery] = useState(0);
    const [completions, setCompletions] = useState(0);
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const {openingStats, createOpeningStats} = useContext(UserContext);

    useLayoutEffect(() => {
        fetchOpenings()
    }, [moves])

    const fetchOpenings = async () => {
        const opening = openingStats.find(o => o.uci === moves);
        if (opening != null) {
            SetCurrentOpening(opening);
            setMastery(opening.history_7);
            setCompletions(opening.completions);
            
            let childOpenings = await fetchChildIds(opening, post);
            childOpenings = await mutateChildOpenings(childOpenings, opening)
            
            setOpeningModules(childOpenings);
        } else {
            // get main and child openings data
            let {main, childOpenings} = await newFetchOpenings(moves, get, post);
            //console.log({main: main, childOpenings: childOpenings})
            
            let openingId = main.id;
            main = await createOpeningStats(openingId, main);

            // mutate child openings with db data (if any exist)
            if (childOpenings.length > 0) {
                childOpenings = await mutateChildOpenings(childOpenings, main)
            }

            SetCurrentOpening(main);
            setMastery(0)
            setCompletions(0);
            setOpeningModules(childOpenings);
        }
        setLoading(false);
    }

    return(
        <>
        <PageContainer>
        <CategoryTitle>Opening Mastery Tree</CategoryTitle>
        <GrayTileModalLink onClick={handleOpenModal} >Why do I see gray tiles?</GrayTileModalLink>
        <GrayTileInfoModal isOpen={openModal} toggle={handleOpenModal} />
        <PreviousSelection />
        {loading ? (  <Loader/>) : (
            <>
        <CurrentOpeningTreeTile currentOpening={currentOpening} mastery={mastery} popularity={round(((currentOpening.np_lichess/TOTAL_LICHESS_NP)*100), 2)}/>
        {(openingModules.length > 0) && 

        <PuzzleTileGrid opening category={"Variations"}>
         {openingModules.map((opening, index) => {
            const linkUrl = `/openings-dashboard-test/${opening.uci}`
            let popularity = round(((opening.np_lichess/currentOpening.np_lichess)*100),0);
            if (popularity < 1) return null;
            const locked = (completions === 0) ? true : false;
            return(
                <OpeningLink key={index} to={locked ? '#' : linkUrl}>
                <OpeningTreeTiles locked={locked} moves={opening.variationPgn} name={opening.name} popularity={popularity} />
                </OpeningLink>
            )})}
        </PuzzleTileGrid>     
         }
        </>
        )}
        </PageContainer>
        </>
    )
}
export default OpeningsDashboardTest;

//removes link underline
const OpeningLink = styled(Link)`
    text-decoration: none;
`

const GrayTileModalLink = styled.div`
    text-align: center;
    padding-bottom: 12px;
    text-decoration: underline;
    cursor: pointer;
`


async function newFetchOpenings(moves, get, post) {
    let endpoint = '/opening-data/';
    let queryParams = `?moves=${moves}`;
    let opening = await get(endpoint + queryParams);

    // get openings from child ids
    endpoint = '/openings-data/children'
    let body = {opening_ids: opening.child_ids};
    let childOpenings = await post(endpoint, body);

    return {main: opening, childOpenings: childOpenings};
}

async function fetchChildIds(opening, post) {
        // get openings from child ids
        let endpoint = '/openings-data/children'
        let body = {opening_ids: opening.child_ids};
        let childOpenings = await post(endpoint, body);
    
        return childOpenings;
}

const round = (num, precision) => {
    const factor = Math.pow(10, precision);
    const tempNumber = num * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

async function mutateChildOpenings(childOpenings, main) {
    childOpenings = childOpenings.sort((a,b) => b.np_lichess - a.np_lichess) // sort by nb plays
        
        // openings.shift(); // remove the main opening
        // filter openings with move that already exists in more popular variations
        let opening_array = []
        childOpenings = childOpenings.filter(opening => {
            let mainUci = main.uci;

            let variationUci = opening.uci;
            variationUci = variationUci.replace(mainUci, '').substring(1, variationUci.length-1);

            if (opening_array.length === 0) {
                opening_array.push(variationUci);
                return true;
            };

            for (let i = 0; i < opening_array.length; i++) {
                let array_item = opening_array[i];
                if (array_item === variationUci.substring(0,array_item.length)) {
                    return false;
                } 
                
            }
            opening_array.push(variationUci);
            return true;
        })

        childOpenings = childOpenings.map(opening => {
            // remove main uci from opening variations
            let mainUci = main.uci;
            let variationUci = opening.uci;
            variationUci = '...' + variationUci.substring(mainUci.length, variationUci.length);
            
            let mainPgn = main.pgn;
            let variationPgn = opening.pgn;
            variationPgn = '...' + variationPgn.substring(mainPgn.length, variationPgn.length);

            return {...opening, variationUci: variationUci, variationPgn: variationPgn};
        })
        childOpenings = childOpenings.slice(0,8) //choose a max of 8 openings
        return childOpenings
}