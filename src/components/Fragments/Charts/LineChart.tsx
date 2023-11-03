import Chart from "react-apexcharts";

interface LineChartProps {
    title: string;
    data: number[];
    category: number[] | string[];
}

const LineChart: React.FC<LineChartProps> = ({title, data, category}) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            id: "basic-bar",
            redrawOnWindowResize: true,

        },
        xaxis: {
            categories: category,
        },
        colors: title=="Grafik Suhu" ? ["#FF718B"] : ["#3A7358"],
        noData: {
            text: "Tidak ada data",
            style: {'fontSize': '2rem'}
        },
    }

    const series: ApexAxisChartSeries = [
        {
            data: data,
            name: title.split(' ')[1],

        },
    ]


    return (
        <Chart
            options={options}
            series={series}
            type="line"
        />
    )
}

export default LineChart;