import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetch from '../../../../api/useFetch';
import {baseURL} from '../../../../api/apiConfig';
import OpeningTreeTiles from '../../../UI_Kit/Tiles/OpeningTreeTiles';
import PuzzleTileGrid from '../../../UI_Kit/Boxes/Grids/PuzzleTileGrid';
import { PageContainer } from '../../../UI_Kit/Page';
import BackButton from '../../../BackButton';
import PreviousSelection from '../../../UI_Kit/PreviousSelection';
import CategoryTitle from '../../../UI_Kit/CategoryTitle/CategoryTitle';

const OpeningsDashboardTest = () => {
    const {get} = useFetch(baseURL);
    const [openingModules, setOpeningModules] = useState([]);
    const {moves} = useParams();

    useEffect(() => {
        console.log('fetch new openings')
        fetchOpenings();
    },[moves])



    const fetchOpenings = async () => {
        // fetch data from opening-data endpoint
        let endpoint = '/openings-data/'
        let queryParams = `?moves=${moves}`
        let openings = await get(endpoint+queryParams);
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
        openings = openings.slice(0,5) //choose a max of 5 openings
        setOpeningModules(openings);
    }

    return(
        <>
        <PageContainer>
        <CategoryTitle>Opening Mastery Tree</CategoryTitle>
        <PreviousSelection />
        <PuzzleTileGrid>
        {(openingModules.length > 0) && openingModules.map((opening, index) => {
            let linkUrl = `/openings-dashboard-test/${opening.uci}`
            return(
                <Link key={index} to={linkUrl}>
                <OpeningTreeTiles moves={opening.uci} name={opening.name} popularity={opening.np_lichess} />
                </Link>
            )
        })}
        </PuzzleTileGrid>
        </PageContainer>
        </>
    )
}
export default OpeningsDashboardTest;