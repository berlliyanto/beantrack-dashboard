import { useEffect, useState } from "react";
import DropDownMenu from "../../Elements/Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetURLParams } from "../../../hooks/useGetURLParams";

interface CardMesinProps {
    id: string | number;
    title: string;
    isConnected: boolean;
    url: string;
    onIsConnectedChange: (newValue: boolean) => void;
}

const CardMesin: React.FC<CardMesinProps> = ({id, url, title, isConnected, onIsConnectedChange}) => {

    const [menuMesin, setMenuMesin] = useState<string[]>(['Hapus', 'Hubungkan']);
    const navigate = useNavigate();
    const {search} = useLocation();
    const active = useGetURLParams(search, 'active');

    const handleConnect = (item: string) => {
        if (item === 'Hubungkan' || item === 'Putuskan') {
            const newIsConnected = !isConnected;
            onIsConnectedChange(newIsConnected);
        }
    }

    useEffect(() => {
        if (isConnected) {
            setMenuMesin((state) => {
                const newState = [...state];
                newState[1] = 'Putuskan';
                return newState;
            });
        } else {
            setMenuMesin((state) => {
                const newState = [...state];
                newState[1] = 'Hubungkan';
                return newState;
            });
        }
    }, [isConnected])

    return (
        <div onClick={() => {navigate('/dashboard?view=dashboard' + url)}}
        className={`border border-[#DADADA] h-16 min-w-[240px] p-3 rounded-md flex justify-between items-center cursor-pointer 
        ${active == id ? 'border border-emerald-200 bg-emerald-100/30' : 'bg-white'}`}>
            <div>
                <h1 className="text-lg font-bold text-slate-800">{title}</h1>
                <p className={`text-sm ${isConnected ? 'text-emerald-500' : 'text-red-500'}`}>{isConnected ? 'Connected' : 'Disconnected'}</p>
            </div>
            <div>
                <DropDownMenu menu={menuMesin} handleConnect={handleConnect} />
            </div>
        </div>
    )
}

export default CardMesin;