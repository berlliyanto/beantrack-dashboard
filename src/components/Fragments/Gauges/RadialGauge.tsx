import { ArcGauge, ArcGaugeProps, ArcScale } from '@progress/kendo-react-gauges';

interface RadialGaugeInterface {
    color: string;
    value: number;
    simbol: string;
}

const RadialGauge: React.FC<RadialGaugeInterface> = ({ color, value, simbol }) => {
    const scale: ArcScale = {
        rangeSize: 40,
        rangeLineCap: "butt",
    }

    const arcOptions: ArcGaugeProps = {
        value: value,
        scale,
        color: color,

    };

    const arcCenterRenderer = () => {
        return <h3 className='text-4xl font-bold text-slate-800'>{value}{simbol}</h3>;
    };

    return (
        <ArcGauge style={{ width: '100%', height: '100%' }} {...arcOptions} arcCenterRender={arcCenterRenderer} />
    )
}

export default RadialGauge;