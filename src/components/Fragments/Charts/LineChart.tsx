import Chart from "react-apexcharts";

interface LineChartInterface {
    title: string;
}

const LineChart: React.FC<LineChartInterface> = ({title}) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            id: "basic-bar",
            redrawOnWindowResize: true,
        },
        xaxis: {
            categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        },
        colors: title=="Grafik Suhu" ? ["#FF718B"] : ["#3A7358"],
        noData: {
            text: "Loading..."
        }

    }

    const series: ApexAxisChartSeries = [
        {
            data: [30, 40, 45, 50, 49, 60, 70, 80, 40, 50, 60, 70],
            name: title,
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