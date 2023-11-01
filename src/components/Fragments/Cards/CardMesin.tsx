import DropDownMenu from "../../Elements/Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetURLParams } from "../../../hooks/useGetURLParams";

interface CardMesinProps {
    id: number;
    code: string | number;
    name: string;
}

const CardMesin: React.FC<CardMesinProps> = ({code, name}) => {

    const navigate = useNavigate();
    const {search} = useLocation();
    const active = useGetURLParams(search, 'active');

    const handleConnect = () => {
        
    }


    return (
        <div onClick={() => {navigate('/dashboard?view=dashboard&active=' + code)}}
        className={`border border-[#DADADA] h-16 min-w-[240px] p-3 rounded-md flex justify-between items-center cursor-pointer 
        ${active == code ? 'border border-emerald-200 bg-emerald-100/30' : 'bg-white'}`}>
            <div>
                <h1 className="text-lg font-bold text-slate-800">{name}</h1>
                <p className={`text-sm text-emerald-500`}>Code : {code}</p>
            </div>
            <div>
                <DropDownMenu menu={['Hapus']} handleConnect={handleConnect} />
            </div>
        </div>
    )
}

export default CardMesin;