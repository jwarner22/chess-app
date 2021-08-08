import Puzzle from '../Puzzle/puzzle.js';

export default function Module(props) {
    //const text = props.location.state.text;
    const theme = props.location.state.module.type_ref;
    const id = props.location.state.module.type.id;
    console.log(props)
    //console.log(text)
    console.log(theme)
    return(
        <>
        <Puzzle rating={1200} theme = {theme} id={id}/>
        </>
    )
}