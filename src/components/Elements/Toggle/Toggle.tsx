
interface ToggleProps {
    icon: string;
}

const Toggle: React.FC<ToggleProps> = ({icon}) => {
    return (
        <div className="border border-[#DADADA] p-2.5 rounded-md duration-300 hover:bg-slate-100 cursor-pointer group md:p-[16px]">
            <img src={icon} alt={icon.split('/')[0]} className="w-4 md:w-5 animate-wiggle"/>
        </div>
    )
}

export default Toggle;