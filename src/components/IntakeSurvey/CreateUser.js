//const options = ["Beginner", "Novice", "Intermediate", "Expert", "Master"]
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import useFetch from '../../api/useFetch';
import { baseURL } from '../../api/apiConfig';

const CreateUser = (props) => {
    const index = props.location.state.index;
    let userId = props.location.state.userId;
    console.log(props)
    const ratings = [800,1000,1200,1400,1600];
    const {post} = useFetch(baseURL);
    const history = useHistory();

    useEffect(() => {
        createNewUser()
    },[])

    // post new user to API
    const createNewUser = (props) => {
        let rating = ratings[index];
        let currentDateTime = new Date().toString()
        console.log(userId, rating, currentDateTime)
        post('/users', {
            user_id: `${userId}`,
            overall_rating: rating,
            inserted_at: currentDateTime,
            total_score: 0,
            puzzles_completed: 0,
            puzzles_correct: 0,
            initial_rating: rating
        }).then(data => {
            history.push({pathname: '/username', state: {userId: userId}});
        })
    }

    return(null)
}

export default CreateUser;