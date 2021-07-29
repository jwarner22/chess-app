import Puzzle from '../Puzzle/puzzle.js';

export default function Module(props) {
    const text = props.location.state.text;
    console.log(text)
    return(
        <>
        <div>{text}</div>
        <Puzzle rating={1200} theme = 'fork'/>
        </>
    )
}