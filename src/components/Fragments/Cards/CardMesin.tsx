import DropDownMenu from "../../Elements/Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetURLParams } from "../../../hooks/useGetURLParams";
import { motion } from "framer-motion"

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
        <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 1}}
        onClick={() => {navigate('/dashboard?view=dashboard&active=' + code)}}
        className={`border border-[#DADADA] h-16 min-w-[240px] p-3 rounded-md flex justify-between items-center cursor-pointer 
        ${active == code ? 'border border-emerald-200 bg-emerald-100/30' : 'bg-white'}`}>
            <div>
                <h1 className="text-lg font-bold text-slate-800">{name}</h1>
                <p className={`text-sm text-emerald-500`}>Code : {code}</p>
            </div>
            <div>
                <DropDownMenu menu={['Hapus']} handleConnect={handleConnect} />
            </div>
        </motion.div>
    )
}

export default CardMesin;