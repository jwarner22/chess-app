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

const TOTAL_LICHESS_NP = 447000000;

const round = (num, precision) => {
    const factor = Math.pow(10, precision);
    const tempNumber = num * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

const OpeningsDashboardTest = () => {
    const {get} = useFetch(baseURL);
    const [openingModules, setOpeningModules] = useState([]);
    const [currentOpening, SetCurrentOpening] = useState({});
    const {moves} = useParams();
    const [loading, setLoading] = useState(true);
    const [completions, setCompletions] = useState(0);
    const [depth, setDepth] = useState(0);

    const {userId, openingStats, updateOpeningStats} = useContext(UserContext);

    useLayoutEffect(() => {
        fetchOpenings()
    }, [moves])

    const fetchOpenings = async () => {
        // fetch data from opening-data endpoint
        let endpoint = '/openings-data/'
        let queryParams = `?moves=${moves}`
        let openings = await get(endpoint+queryParams);
        //console.log({response: openings})
        if (openings.length === 1) {
            SetCurrentOpening(openings[0]); // if no variatins, set current opening to the opening
            setOpeningModules([]); // set the opening modules to the variations
            return;
        }
        let main = openings.filter(opening => opening.uci === moves)[0];
        //console.log({main: main})
        SetCurrentOpening(main);
        
        // get number of completions for main module
        let mainData = await getCompletions(main);
        setCompletions(mainData.completions)
        setDepth(mainData.depth)

        // check if nb plays exists for mainline
        if (main != null) {
            if (openings.some(opening => opening.np_lichess == null)) {
            console.log('no nb plays')
            let endpoint = '/openings-data/lichess-explorer/'
             let openings_response = await get(endpoint+queryParams); 
             // map response np plays to openings
             openings = openings.map(opening => {
                 // map response np_lichess to np_lichess of openings
                 if (!openings_response.some(item => item.uci === opening.uci)) {
                        opening.np_lichess = 0;
                        return opening;
                 }
                let response_np = openings_response.filter(response_opening => response_opening.uci === opening.uci)[0].np_lichess;
                opening.np_lichess = response_np;
                return opening;
            })
            }
        }

        openings = openings.sort((a,b) => b.np_lichess - a.np_lichess) // sort by nb plays
        openings.shift(); // remove the main opening
        // filter openings with move that already exists in more popular variations
        let opening_array = []
        openings = openings.filter(opening => {
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
        openings = openings.map(opening => {
            // remove main uci from opening variations
            let mainUci = main.uci;
            let variationUci = opening.uci;
            //variationUci = variationUci.replace(mainUci, '...');
            variationUci = '...' + variationUci.substring(mainUci.length, variationUci.length);
            return {...opening, variationUci: variationUci};
        })
        openings = openings.slice(0,8) //choose a max of 8 openings
        setOpeningModules(openings);
        setLoading(false);
    }

    const getCompletions = async (opening) => {
        // check global state for opening stats
        if (openingStats.some(item => item.id === opening.id)) {
            let item = openingStats.filter(item => item.id === opening.id)[0];
            return item;
        }

        // fetch opening stats from api
        const url = `/opening-completions/${userId}/${opening.uci}`
        const response = await get(url);
        updateOpeningStats(response); // update the opening stats in global state

        return response;
    }

    return(
        <>
        <PageContainer>
        <CategoryTitle>Opening Mastery Tree</CategoryTitle>
        <PreviousSelection />
        {loading ? (  <Loader/>) : (
            <>
        <CurrentOpeningTreeTile currentOpening={currentOpening} completions={completions} popularity={round(((currentOpening.np_lichess/TOTAL_LICHESS_NP)*100),2)}/>
        {(openingModules.length > 0) && 

        <PuzzleTileGrid opening category={"Variations"}>
         {openingModules.map((opening, index) => {
            const linkUrl = `/openings-dashboard-test/${opening.uci}`
            let popularity = round(((opening.np_lichess/currentOpening.np_lichess)*100),0);
            if (popularity < 1) return null;
            const locked = (completions === 0) ? true : false;
            return(
                <OpeningLink key={index} to={locked ? '#' : linkUrl}>
                <OpeningTreeTiles locked={locked} moves={opening.variationUci} name={opening.name} popularity={popularity} />
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