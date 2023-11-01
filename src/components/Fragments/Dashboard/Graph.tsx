import LineChart from "../Charts/LineChart"

interface GraphDashboardInterface{
    title: string;
}

const GraphDashboard:React.FC<GraphDashboardInterface> = ({title}) => {
    return (
        <div className="w-full xl:flex-1 bg-white p-2 md:p-4 border border-[#DADADA] rounded-md">
            <h1>{title}</h1>
            <LineChart title={title} />
        </div>
    )
}

export default GraphDashboard;