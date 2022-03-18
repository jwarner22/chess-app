import {LineChart, Line, ResponsiveContainer, ReferenceLine} from 'recharts';


export default function Chart({data}) {
    return(
        <ResponsiveContainer width='100%' height='50%' aspect={3}>
        <LineChart width={300} height={200} data={data} margin={{top: 5, right: 20, left: 20, bottom: 15}}>
            <Line type="monotone" dataKey="score" stroke="#247cf1" strokeWidth={2} />
        </LineChart>
        </ResponsiveContainer> 
            )
}

export function ReferenceChart({data, reference}) {
    return(
        <ResponsiveContainer width='100%' height='100%' aspect={3}>
        <LineChart width={300} height={200} data={data} margin={{top: 5, right: 20, left: 20, bottom: 15}}>
            <ReferenceLine y={reference.value} stroke="red" strokeDasharray="3 3" label={`Next Rank: ${reference.name}`}/>
            <Line type="monotone" dataKey="score" stroke="#247cf1" strokeWidth={2} />
        </LineChart>
        </ResponsiveContainer> 
            )
}

export function MultiChart({data, lineData}) {
    const exampleData = [{
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        }
    ]
    const exampleLineData = [
        {
            name: "uv",
            color: "#247cf1",
        },
        {
            name: "pv",
            color: "#f1c40f",
        },
        {
            name: "amt",
            color: "#e74c3c",
        }
    ]
    return (
        <ResponsiveContainer width='100%' height='50%' aspect={3}>
        <LineChart width={300} height={200} data={exampleData} margin={{top: 5, right: 20, left: 20, bottom: 15}}>
            {exampleLineData.map((line, index) => {
                return(
            <Line type="monotone" dataKey={line.name} stroke={line.color} strokeWidth={2} />
                )
        })}        
        </LineChart>
        </ResponsiveContainer>
    )
}

//<ResponsiveContainer width='100%' height='100%'>


