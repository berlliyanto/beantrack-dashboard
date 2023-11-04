import DropDownMenu from "../../Elements/Dropdown/Dropdown"
import RadialGauge from "../Gauges/RadialGauge"

interface GaugeDashboardProps {
    title: string;
    subtitle: string;
    color: string;
    value: number;
    simbol: string;
}

const GaugeDashboard: React.FC<GaugeDashboardProps> = ({title, subtitle, color, value, simbol}) => {
    return (
        <div className="w-full p-4 bg-white md:p-4 border border-[#DADADA] rounded-md xl:flex-1">
            <div className="flex justify-between mb-4">
                <div>
                    <h1 className="font-bold text-lg text-slate-800">{title}</h1>
                    <p className="text-sm text-slate-700">{subtitle}</p>
                </div>
                <DropDownMenu menu={['IOT 1', 'IOT 2', 'IOT 3']} handleConnect={() => { }} />
            </div>
            <div className="mx-auto">
            <RadialGauge color={color} value={value} simbol={simbol} />
            </div>
            <div className={` w-fit py-1 px-2 rounded-sm mx-auto text-sm text-primary`}>
                
            </div>
            <p className="text-center text-sm text-slate-500 pt-2"></p>
            <p className="text-center text-sm text-slate-500 "></p>
        </div>
    )
}

export default GaugeDashboard;