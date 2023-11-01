
interface ButtonSocmedProps {
    className?: string
    text: string;
    icon: string
}

const ButtonSocmed: React.FC<ButtonSocmedProps> = ({ text, icon, className }) => {
    return (
        <button className={`w-full h-12 flex items-center justify-center bg-slate-100 rounded-md border border-slate-200 
        duration-300 hover:bg-slate-200 active:bg-slate-300 ${className}`}>
            <img src={icon} alt={text} />
            <span className="text-slate-800 font-bold pl-2">{text}</span>
        </button>
    )
}

export default ButtonSocmed;