import {LineChart, Line, ResponsiveContainer} from 'recharts';


export default function Chart({data}) {
    return(
        <ResponsiveContainer width='100%' aspect={3}>
        <LineChart width={300} height={200} data={data} margin={{top: 5, right: 20, left: 20, bottom: 15}}>
            <Line type="monotone" dataKey="score" stroke="#247cf1" strokeWidth={2} />
        </LineChart>
        </ResponsiveContainer>
            )
}

//<ResponsiveContainer width='100%' height='100%'>
