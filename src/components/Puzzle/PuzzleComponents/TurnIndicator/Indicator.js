import BlackIndicator from "./BlackIndicator"
import WhiteIndicator from "./WhiteIndicator"


const Indicator = (props) => {

    if (props.turnColor !== "black"){
    return  <BlackIndicator />}
    else return <WhiteIndicator />
    }


export default Indicator
