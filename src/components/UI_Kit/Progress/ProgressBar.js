import {useEffect, useState} from 'react'
import styled from 'styled-components'

const ProgressBar = (props) => {
    const [style, setStyle] = useState({})
    const max = 100;

    setTimeout(() => {
		const newValue = {
			opacity: 1,
			width: `${props.done}%`
		}
		
		setStyle(newValue);
	}, 200);

  return (<>
        <ProgressLine >
            <ProgressFill style={style}>
                <ProgressPercent>
                </ProgressPercent>
            </ProgressFill>
        </ProgressLine>
    </>
  )
}

export default ProgressBar

const ProgressContainer = styled.div`
    width: 100%;
    margin: 12px auto;
`
const ProgressLabel = styled.h4`
    color: #243862;
    margin: 24px 0px 12px 0px; 
`
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
	width: 0;
	opacity: 0;
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
