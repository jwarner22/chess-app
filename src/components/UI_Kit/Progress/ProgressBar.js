import {useEffect, useLayoutEffect, useState} from 'react'
import styled from 'styled-components'


const ProgressLine = styled.div`
	background-color: #d8d8d8;
	border-radius: 20px;
	position: relative;
	margin: 15px 0;
	height: 20px;
	width: 100%;
`

const ProgressFill = styled.div`
	background: linear-gradient(to left, #F2709C, #FF9472);
	box-shadow: 0 3px 3px -5px #F2709C, 0 2px 5px #F2709C;
	border-radius: 20px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: ${props => {if(!props.animate){
		return `${props.fullWidth}%`
		} else if(props.initialWidth === 0) {
		return "0%"
		} else if (props.initialWidth > 0 && props.initialWidth < 100){
			return `${props.initialWidth}%`
		} else {
			return '100%'
		}
	}};
	opacity: ${props => {
		if(props.fullWidth > 0){
			return 1
		} return 0
	}};
	transition: 1s ease 0.3s;
`

const ProgressPercent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	margin: 0;
    color: #fff;
`




const ProgressBar = (props) => {
    const [style, setStyle] = useState({})
    //const max = 100;

	// const updatePreviousWidth = () => {
	// 	window.localStorage.setItem('previousPercentage', props.done)
	// }

	useEffect(() => {
		setTimeout(updateStyle, 200);
	}, [props.done]);

	const updateStyle = () => {
		const newValue = {
			opacity: 1,
			width: `${props.done}%`
		}
		setStyle(newValue);
	}
	//console.log(style)

  return (<>
        <ProgressLine >
            <ProgressFill style={style} initialWidth={props.initialWidth} animate={props.animate} fullWidth={props.done}>
                <ProgressPercent>
                </ProgressPercent>
            </ProgressFill>
        </ProgressLine>
    </>
  )
}

export default ProgressBar

