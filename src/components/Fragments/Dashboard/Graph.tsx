import LineChart from "../Charts/LineChart"

interface GraphDashboardProps{
    title: string;
    simbol: string;
    data: number[];
    category: string[] | number[];
}

const GraphDashboard:React.FC<GraphDashboardProps> = ({title, simbol, data, category}) => {
    return (
        <div className="w-full xl:flex-1 bg-white p-2 md:p-4 border border-[#DADADA] rounded-md">
            <h1>{title} {`(${simbol})`}</h1>
            <LineChart title={title} data={data} category={category} />
        </div>
    )
}

export default GraphDashboard;