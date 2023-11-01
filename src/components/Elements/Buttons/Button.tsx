interface ButtonProps {
    className?: string
    text: string;
    disabled: boolean;
    onClick? : () => void;
}

const Button: React.FC<ButtonProps> = ({text, className, disabled, onClick}) => {
    return (
        <button onClick={onClick}
        className={`h-14 bg-primary rounded-md text-white font-semibold duration-300 hover:bg-emerald-800 active:scale-95 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`} disabled={disabled}>{text}</button>
    )
}

export default Button;