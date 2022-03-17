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

    const {userId, openingStats, updateOpeningStats} = useContext(UserContext);

    useLayoutEffect(() => {
        fetchOpenings()
    }, [moves])

    const fetchOpenings = async () => {

        const opening = openingStats.find(o => o.uci === moves);
        console.log(opening)
        if (opening != null) {
            SetCurrentOpening(opening);
            setMastery(opening.history_7);
            setCompletions(opening.completions);
            console.log(opening)
            let childOpenings = await fetchChildIds(opening, post);
            console.log(childOpenings)
            childOpenings = await mutateChildOpenings(childOpenings, opening)
            console.log(childOpenings)
            setOpeningModules(childOpenings);
        } else {
            // this is BROKEN
            // get main and child openings data
            let openingsData = await newFetchOpenings(moves, get, post);
            console.log(openingsData)
            if (openingsData.childOpenings.length === 0) {
                SetCurrentOpening(openingsData.main); // if no variatins, set current opening to the opening
                setOpeningModules(openingsData.childOpenings); // set the opening modules to the variations
                setLoading(false);
                return;
            }

            let childOpenings = await mutateChildOpenings(openingsData.childOpenings, openingsData.main)
            console.log(childOpenings)
            SetCurrentOpening(openingsData.main);
            let mainData = await getCompletions(openingsData.main);        // get number of completions for main module
            setMastery(mainData.mastery)
            setCompletions(mainData.completions);
            setOpeningModules(childOpenings);
        }
        setLoading(false);
    }

    const getCompletions = async (main) => {

        // check global state for opening stats
        // if (openingStats.some(item => item.id === main.id)) {
        //     let item = openingStats.filter(item => item.id === main.id)[0];
        //     return item;
        // }
        // fetch opening stats from api
        const url = `/opening-completions/${userId}/${main.pgn}`
        const response = await get(url);
        updateOpeningStats({...response, child_ids: main.child_ids}); // update the opening stats in global state
        return response;
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

// async function getNbPlays(openingsData, get) {
//     if (openingsData.main == null) throw new Error('Main opening is null')
//         // if anay null np_lichess values exist, fetch them
//         if (openingsData.main.np_lichess == null || openingsData.childOpenings.some(opening => opening.np_lichess == null)) {
//           console.log('no nb plays');

//           let endpoint = `/openings-data/lichess-explorer/${openingsData.main.pgn}`;
//           let openings_response = await get(endpoint);

//           let opening_np = openings_response.find(opening => opening.id === openingsData.main.id);
//           openingsData.main.np_lichess = opening_np.np_lichess; // map the np_lichess value to the main opening

//           // map the np_lichess values to the child openings
//           openingsData.childOpenings.forEach(opening => {
//             let opening_np = openings_response.find(response_opening => opening.id === response_opening.id);
//             opening.np_lichess = opening_np.np_lichess;
//             return opening;
//           })
//         }
//     return openingsData;
// }

async function newFetchOpenings(moves, get, post) {
    let endpoint = '/opening-data/';
    let queryParams = `?moves=${moves}`;
    let opening = await get(endpoint + queryParams);

    // if (opening.child_ids == null) {
    //     // get child ids
    //     let openingId = opening.id;
    //     endpoint = `/openings-data/${openingId}/children`;
    //     let response = await get(endpoint);
    //     opening.child_ids = response.child_ids;
    // }

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