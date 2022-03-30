import {LineChart, Line, ResponsiveContainer, Legend, LabelList} from 'recharts';

const CustomizedLabel = ({x, y,  value, mastery, diff, color}) => {
    if (value === "6") {
        let index = parseInt(value)
        mastery = mastery[index]
        let text = diff > 0 ? `+${diff}` : diff.toString();
    return (
        <text x={x} y={y} dy={-16} dx={-8} fill={color} fontSize={16} textAnchor="middle">
            {mastery} ({text})
        </text>
    );
} else {
    let index = parseInt(value)
    mastery = mastery[index]
    return (

            <text x={x} y={y} dy={-16} dx={-8} fill={color} fontSize={16} textAnchor="middle">
                {mastery}
            </text>

    );
}
}

export default function Chart({data}) {

    let diff = data[6].score - data[5].score;
    let mastery = data.map(item => item.score);

    return(
        <ResponsiveContainer width='100%' height='100%' aspect={3}>
        <LineChart width={300} height={300} data={data} margin={{top: 24, right: 36, left: 24, bottom: 24}}>
            <Line type="monotone" dataKey="score" stroke="#247cf1" strokeWidth={2}>
            <LabelList dataKey="name" content={<CustomizedLabel color="#247cf1" mastery={mastery} diff={diff}/>} />
            </Line>
        </LineChart>
        </ResponsiveContainer> 
            )
}

// export function ReferenceChart({data, reference}) {
//     return(
//         <ResponsiveContainer width='100%' height='100%' aspect={3}>
//         <LineChart width={300} height={200} data={data} margin={{top: 5, right: 20, left: 20, bottom: 15}}>
//             {/* <ReferenceLine y={reference.value} stroke="red" strokeDasharray="3 3" label={`Next Rank: ${reference.name}`}/> */}
//             <Line type="monotone" dataKey="score" stroke="#247cf1" strokeWidth={2} />
//         </LineChart>
//         </ResponsiveContainer> 
//             )
// }

export function MultiChart({data, lineData}) {


    lineData = lineData.map(item => {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        randomColor = "#" + randomColor;
        return({
            name: item.opening_id,
            color: randomColor,
            title: item.name
        })
    })

    return (
        <ResponsiveContainer width='100%' height='100%' aspect={3}>
        <LineChart width={300} height={200} data={data} margin={{top: 16, right: 24, left: 8, bottom: 18}}>
            <Legend verticalAlign="bottom" height={0}/>
            {lineData.map((line, index) => {
                // let mastery = data[6][line.name];
                let diff = data[6][line.name] - data[5][line.name];
                let mastery = data.map(item => item[line.name]);
            return( 
            <Line  name={line.title} key={index} type="monotone" dataKey={line.name} stroke={line.color} strokeWidth={2}>
            <LabelList dataKey="name" content={<CustomizedLabel mastery={mastery} diff={diff} color={line.color}/>} />
            </Line>   
            )
        })}        
        </LineChart>
        </ResponsiveContainer>
    )
}

//<ResponsiveContainer width='100%' height='100%'>


