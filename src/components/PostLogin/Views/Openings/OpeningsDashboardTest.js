import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetch from '../../../api/useFetch';
import {baseURL} from '../../../api/apiConfig';

const OpeningsDashboardTest = () => {
    const {get} = useFetch(baseURL);
    const [openingModules, setOpeningModules] = useState([]);
    const {moves} = useParams();
    console.log({moves: moves});
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
        <div>
            <h1>Openings Dashboard Test</h1>
        </div>
        {(openingModules.length > 0) && openingModules.map(opening => {
            let linkUrl = `/openings-dashboard-test/${opening.uci}`
            return(
                <Link to={linkUrl}>
                <div>
                    <h1>{opening.uci}</h1>
                    <h2>{opening.name}</h2>
                    <h3>{opening.np_lichess}</h3>
                </div>
                </Link>
            )
        })}
        </>
    )
}
export default OpeningsDashboardTest;