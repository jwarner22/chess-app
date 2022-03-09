import {useLayoutEffect, useEffect, useState} from 'react';
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

const OpeningsDashboardTest = () => {
    const {get} = useFetch(baseURL);
    const [openingModules, setOpeningModules] = useState([]);
    const [currentOpening, SetCurrentOpening] = useState({});
    const {moves} = useParams();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     console.log('fetch new openings')
    //     fetchOpenings();
    // },[moves])

    useLayoutEffect(() => {
        const fetchOpenings = async () => {
            // fetch data from opening-data endpoint
            let endpoint = '/openings-data/'
            let queryParams = `?moves=${moves}`
            let openings = await get(endpoint+queryParams);
            console.log({response: openings})
            if (openings.length === 1) {
                SetCurrentOpening(openings[0]); // if no variatins, set current opening to the opening
                setOpeningModules([]); // set the opening modules to the variations
                return;
            }
            let main = openings.filter(opening => opening.uci === moves)[0];
            // check if nb plays exists for mainline
            if (main != null) {
                console.log(main.np_lichess)
                if (openings.some(opening => opening.np_lichess == null)) {
                console.log('no nb plays')
                let endpoint = '/openings-data/lichess-explorer/'
                 openings = await get(endpoint+queryParams);  
                }
            }
            openings = openings.filter(opening => opening.np_lichess != null) // filter out openings with no nb plays
            openings = openings.sort((a,b) => b.np_lichess - a.np_lichess) // sort by nb plays
            openings = openings.slice(1,6) //choose a max of 5 openings
    
            let selectedOpening = openings[0];
            setOpeningModules(openings.slice(1,6));
            SetCurrentOpening(selectedOpening)
            setLoading(false)
        }
        fetchOpenings()
    }, [moves])

    console.log({currentOpening: currentOpening})

    return(
        <>
        <PageContainer>
        <CategoryTitle>Opening Mastery Tree</CategoryTitle>
        <PreviousSelection />
        {loading ? (  <Loader/>) : (
            <>
        <CurrentOpeningTreeTile moves={currentOpening.uci} name={currentOpening.name} popularity={currentOpening.np_lichess}/>
        {(openingModules.length > 0) && 

        <PuzzleTileGrid opening category={"Variations"}>
         {openingModules.map((opening, index) => {
            let linkUrl = `/openings-dashboard-test/${opening.uci}`
            return(
                <OpeningLink key={index} to={linkUrl}>
                <OpeningTreeTiles moves={opening.uci} name={opening.name} popularity={opening.np_lichess} />
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